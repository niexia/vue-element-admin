export default function getOverviewFieldList(config = {}) {
  const { $createElement } = this;
  const {
    handleAddClick
  } = config
  return [
    // main-form
    {
      type: 'input',
      label: 'id',
      region: 'main',
      key: 'dsp_id',
      value: '',
      domAttrs: {
        attrs: {
          placeholder: '请输入 id',
        },
      },
    },
    {
      type: 'input',
      label: 'advertiser_id',
      region: 'main',
      key: 'advertiser_id',
      value: '',
      domAttrs: {
        attrs: {
          placeholder: '请输入 advertiser_id',
        },
      },
    },
    {
      type: 'input',
      label: 'inventory_type',
      region: 'main',
      key: 'inventory_type',
      value: '',
      domAttrs: {
        attrs: {
          placeholder: '请输入 inventory_type',
        },
      },
    },
    {
      type: 'slot',
      region: 'main',
      align: 'right',
      slots: {
        default: h => {
          return $createElement('span', {
            style: {
              color: '#666666',
              lineHeight: '34px'
            }
          }, new Date().toLocaleDateString());
        }
      }
    },
    {
      type: 'button',
      align: 'right',
      text: '新增',
      region: 'main',
      attrs: {
        type: 'primary',
      },
      events: {
        click: handleAddClick,
      },
    },
    // option-form
    {
      type: 'input',
      label: 'campaign_id',
      region: 'option',
      key: 'campaign_id',
      value: '',
      attrs: {
        placeholder: '请输入 campaign_id',
      },
    },
    {
      type: 'input',
      label: 'name',
      region: 'option',
      key: 'name',
      value: '',
      domAttrs: {
        attrs: {
          placeholder: '请输入 name',
        },
      },
    },
    {
      type: 'input',
      label: 'pricing_type',
      region: 'option',
      key: 'pricing_type',
      value: '',
      domAttrs: {
        attrs: {
          placeholder: '请输入 pricing_type',
        },
      },
    },
    {
      type: 'input',
      label: 'dsp_type',
      region: 'option',
      key: 'dsp_type',
      value: '',
      domAttrs: {
        attrs: {
          placeholder: '请输入 dsp_type',
        },
      },
    },
    {
      type: 'input',
      label: 'api_url',
      region: 'option',
      key: 'api_url',
      value: '',
      domAttrs: {
        attrs: {
          placeholder: '请输入 api_url',
        },
      },
    },
    {
      type: 'input',
      label: 'status',
      region: 'option',
      key: 'status',
      value: '',
      domAttrs: {
        attrs: {
          placeholder: '请输入 status',
        },
      },
    },
  ]
}
