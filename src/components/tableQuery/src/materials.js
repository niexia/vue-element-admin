import ElInput from 'element-ui/lib/input';
import ElInputNumber from 'element-ui/lib/input-number';
import ElSelect from 'element-ui/lib/select';
import ElOption from 'element-ui/lib/option';
// import ElOptionGroup from 'element-ui/lib/option-group';
import ElTimeSelect from 'element-ui/lib/time-select';
import ElTimePicker from 'element-ui/lib/time-picker';
import ElDatePicker from 'element-ui/lib/date-picker';
import ElCascader from 'element-ui/lib/cascader';
import ElCheckbox from 'element-ui/lib/checkbox';
import ElButton from 'element-ui/lib/button';

const mixins = {
  props: {
    field: {
      type: Object,
      default() {
        return {};
      }
    }
  }
};
// render 函数中没有与 v-model 的直接对应
const _on = self => {
  return {
    input(val) {
      self.field.value = val;
      self.$emit('input', val);
    }
  }
}
const getProps = (self, attrs, events) => {
  return {
    props: attrs,
    on: Object({}, events, _on(self))
  }
}

const components = {
  'y-select': {
    mixins: [mixins],
    render(h) {
      const renderProxy = this._renderProxy;
      const {attrs = {}, events = {}, slots = {}, options} = this.field;
      const Props = getProps(this, attrs, events);
      return (
        < ElSelect
          value={this.field.value}
          {...Props}>
          {
            Array.apply(null, {
              length: options.length
            }).map(function (item) {
              return (
                <ElOption
                  key={item.value}
                  label={item.label}
                  value={item.value}
                  disabled={item.disabled}>
                </ElOption>
              )
            })
          }
          {slots.prefix && <template slot='prefix'>{slots.prefix.call(renderProxy, h)}</template>}
        </ElSelect>
      )
    }
  },

  'y-input': {
    mixins: [mixins],
    render(h) {
      const renderProxy = this._renderProxy;
      const {attrs = {}, events = {}, slots = {}} = this.field;
      const Props = getProps(this, attrs, events);
      return (
        <ElInput value={this.field.value} placeholder={attrs.placeholder} {...Props}>
          {slots.prepend && <template slot='prepend'>{slots.prepend.call(renderProxy, h)}</template>}
          {slots.append && <template slot='append'>{slots.append.call(renderProxy, h)}</template>}
          {slots.prefix && <template slot='prefix'>{slots.prefix.call(renderProxy, h)}</template>}
          {slots.suffix && <template slot='suffix'>{slots.suffix.call(renderProxy, h)}</template>}
        </ElInput>
      );
    }
  },

  'y-time-select': {
    mixins: [mixins],
    render(h) {
      const {attrs = {}, events = {}} = this.field;
      const Props = getProps(this, attrs, events);
      return (<ElTimeSelect value={this.field.value} {...Props}></ElTimeSelect>);
    }
  },

  'y-time-picker': {
    mixins: [mixins],
    render(h) {
      const {attrs = {}, events = {}} = this.field;
      const Props = getProps(this, attrs, events);
      return (<ElTimePicker value={this.field.value} {...Props}></ElTimePicker>);
    }
  },

  'y-date-picker': {
    mixins: [mixins],
    render(h) {
      const {attrs = {}, events = {}} = this.field;
      const Props = getProps(this, attrs, events);
      return (<ElDatePicker value={this.field.value} {...Props}></ElDatePicker>);
    }
  },

  'y-cascader': {
    mixins: [mixins],
    render(h) {
      const self = this;
      const {attrs = {}, events = {}, options} = this.field;
      const Props = getProps(this, attrs, events);
      return (<ElCascader value={this.field.value} options={options} {...Props}></ElCascader>);
    }
  },

  'y-button': {
    mixins: [mixins],
    render(h) {
      const renderProxy = this._renderProxy;
      const {attrs = {}, events = {}, slots = {}, text = ''} = this.field;
      let Props = {props: attrs, on: Object.assign({}, events)};
      return (
        <ElButton {...Props}>
          {
            slots.default
              ? slots.default.call(renderProxy, h)
              : text
          }
        </ElButton>
      );
    }
  },

  'y-checkbox': {
    mixins: [mixins],
    render(h) {
      const renderProxy = this._renderProxy;
      const {attrs = {}, events = {}, slots = {}, text = ''} = this.field;
      const Props = getProps(this, attrs, events);
      return (<ElCheckbox value={this.field.value} {...Props}>
        {
          slots.default
            ? slots.default.call(renderProxy, h)
            : text
        }
      </ElCheckbox>);
    }
  },

  'y-input-number': {
    mixins: [mixins],
    render(h) {
      const self = this;
      const {attrs = {}, events = {}} = this.field;
      const Props = getProps(this, attrs, events);
      return (<ElInputNumber value={this.field.value} {...Props}></ElInputNumber>);
    }
  },
}

export default {
  name: 'y-component',
  components: components,
  props: {
    field: Object,
  },
  render(h) {
    const mapList = {
      'y-input': <y-input field={this.field}></y-input>,
      'y-input-number': <y-input-number field={this.field}></y-input-number>,
      'y-select': <y-select field={this.field}></y-select>,
      'y-checkbox': <y-checkbox field={this.field}></y-checkbox>,
      'y-time-select': <y-time-select field={this.field}></y-time-select>,
      'y-time-picker': <y-time-picker field={this.field}></y-time-picker>,
      'y-date-picker': <y-date-picker field={this.field}></y-date-picker>,
      'y-cascader': <y-cascader field={this.field}></y-cascader>,
      'y-button': <y-button field={this.field}></y-button>,
    };
    console.log(this.field, this.field.type);
    return mapList[this.field.type || 'y-input'];
  }
}