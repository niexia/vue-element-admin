import { createTest, createVue, destroyVM } from '../../../test/unit/util';
import Transfer from 'packages/transfer';

describe('Transfer', () => {
  let vm;
  const getTestData = () => {
    const data = [];
    for (let i = 1; i <= 15; i++) {
      data.push({
        key: i,
        label: `备选项 ${ i }`,
        disabled: i % 4 === 0
      });
    }
    return data;
  };
  const createTransfer = (props, opts) => {
    return createVue(Object.assign({
      template: `
        <af-transfer :data="testData" ref="transfer" ${props}>
        </af-transfer>
      `,

      created() {
        this.testData = getTestData();
      }
    }, opts));
  };

  afterEach(() => {
    destroyVM(vm);
  });

  it('create', () => {
    vm = createTest(Transfer, true);
    expect(vm.$el).to.exist;
  });

  it('default target list', () => {
    vm = createTransfer('v-model="value"', {
      data() {
        return {
          value: [1, 4]
        };
      }
    });
    expect(vm.$refs.transfer.sourceData.length).to.equal(13);
  });

  it('filterable', done => {
    vm = createTransfer('v-model="value" filterable :filter-method="method"', {
      data() {
        return {
          value: [],
          method(query, option) {
            return option.key === Number(query);
          }
        };
      }
    });
    const transfer = vm.$refs.transfer;
    const leftList = transfer.$el.querySelector('.af-transfer-panel').__vue__;
    leftList.query = '1';
    setTimeout(_ => {
      expect(leftList.filteredData.length).to.equal(1);
      done();
    }, 50);
  });

  it('transfer', done => {
    vm = createTransfer('v-model="value" :left-default-checked="[2, 3]" :right-default-checked="[1]"', {
      data() {
        return {
          value: [1, 4]
        };
      }
    });
    const transfer = vm.$refs.transfer;

    setTimeout(_ => {
      transfer.addToLeft();
      setTimeout(_ => {
        expect(transfer.sourceData.length).to.equal(14);
        transfer.addToRight();
        setTimeout(_ => {
          expect(transfer.sourceData.length).to.equal(12);
          done();
        }, 50);
      }, 50);
    }, 50);
  });

  it('customize', () => {
    vm = createTransfer('v-model="value" :titles="titles" :render-content="renderFunc" :format="format"', {
      data() {
        return {
          value: [2],
          titles: ['表1', '表2'],
          format: { noChecked: 'no', hasChecked: 'has' },
          renderFunc(h, option) {
            return <span>{ option.key } - { option.label }</span>;
          }
        };
      }
    });
    const transfer = vm.$refs.transfer.$el;
    const label = transfer.querySelector('.af-transfer-panel__header');
    const footer = transfer.querySelector('.af-transfer-panel__footer');
    expect(label.innerText.indexOf('表1') > -1).to.true;
    expect(transfer.querySelector('.af-transfer-panel__list .af-checkbox__label span').innerText).to.equal('1 - 备选项 1');
    expect(footer.querySelector('span').innerText).to.equal('no');
  });

  it('check all', done => {
    vm = createTransfer('v-model="value"', {
      data() {
        return {
          value: []
        };
      }
    });
    const transfer = vm.$refs.transfer;
    setTimeout(() => {
      transfer.addAllToRight();
      setTimeout(() => {
        expect(transfer.sourceData.length).to.equal(3);
        transfer.addAllToLeft();
        setTimeout(() => {
          expect(transfer.sourceData.length).to.equal(15);
          done();
        }, 50);
      }, 50);
    }, 50);
  });

  describe('target order', () => {
    it('original(default)', done => {
      vm = createTransfer('v-model="value" :left-default-checked="[2, 3]"', {
        data() {
          return {
            value: [1, 4]
          };
        }
      });
      const transfer = vm.$refs.transfer;
      setTimeout(() => {
        transfer.addToRight();
        setTimeout(() => {
          const targetItems = [].slice.call(vm.$el.querySelectorAll('.af-transfer__buttons + .af-transfer-panel .af-transfer-panel__body .af-checkbox__label span'));
          expect(targetItems.map(item => item.innerText)).to.deep.equal(['备选项 1', '备选项 2', '备选项 3', '备选项 4']);
          done();
        }, 50);
      }, 50);
    });

    it('push', done => {
      vm = createTransfer('v-model="value" :left-default-checked="[2, 3]" target-order="push"', {
        data() {
          return {
            value: [1, 4]
          };
        }
      });
      const transfer = vm.$refs.transfer;
      setTimeout(() => {
        transfer.addToRight();
        setTimeout(() => {
          const targetItems = [].slice.call(vm.$el.querySelectorAll('.af-transfer__buttons + .af-transfer-panel .af-transfer-panel__body .af-checkbox__label span'));
          expect(targetItems.map(item => item.innerText)).to.deep.equal(['备选项 1', '备选项 4', '备选项 2', '备选项 3']);
          done();
        }, 50);
      }, 50);
    });

    it('unshift', done => {
      vm = createTransfer('v-model="value" :left-default-checked="[2, 3]" target-order="unshift"', {
        data() {
          return {
            value: [1, 4]
          };
        }
      });
      const transfer = vm.$refs.transfer;
      setTimeout(() => {
        transfer.addToRight();
        setTimeout(() => {
          const targetItems = [].slice.call(vm.$el.querySelectorAll('.af-transfer__buttons + .af-transfer-panel .af-transfer-panel__body .af-checkbox__label span'));
          expect(targetItems.map(item => item.innerText)).to.deep.equal(['备选项 2', '备选项 3', '备选项 1', '备选项 4']);
          done();
        }, 50);
      }, 50);
    });
  });
});
