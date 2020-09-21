import ElInput from 'element-ui/lib/input';
import ElSelect from 'element-ui/lib/select';
import ElOption from 'element-ui/lib/option';
import ElButton from 'element-ui/lib/button';

const fieldMixins = {
  props: {
    field: {
      type: Object,
      default: () => ({}),
    },
    data: {
      type: Object,
      default: () => ({}),
    },
  },
}

const hasKey = (obj = {}, key = '') =>
  key && Object.hasOwnProperty.call(obj, key)

const getValue = (vm, events) => {
  const {
    data = {},
      field: {
        key = ''
      },
  } = vm
  return !hasKey(data, key) ?
    {
      props: {},
      on: {}
    } :
    {
      props: {
        value: data[key]
      },
      on: {
        input(value) {
          data[key] = value
        },
      },
    }
}

const getProps = (vm, attrs, events, domAttrs) => {
  const {
    props: valueAttrs,
    on: inputEvents
  } = getValue(vm, events)
  return {
    ...domAttrs,
    props: {
      ...attrs,
      ...valueAttrs,
    },
    on: {
      ...events,
      ...inputEvents,
    },
  }
}

const components = {
  'f-select': {
    mixins: [fieldMixins],
    computed: {
      optionsAttrs() {
        const { optionsAttrs = {} } = this.field
        const {
          label = 'label',
          value = 'value',
          hint = 'hint',
          disabled = 'disabled',
        } = optionsAttrs
        return {
          label,
          value,
          hint,
          disabled,
        }
      },
    },
    render(h) {
      const { field, optionsAttrs } = this
      const {
        attrs = {},
        events = {},
        domAttrs = {},
        options = [],
        popoverAttrs,
      } = field
      const { label, value, disabled, hint } = optionsAttrs
      const dataObject = getProps(this, attrs, events, domAttrs)
      return (
        <ElSelect {...dataObject}>
          {options.map((item, index) => (
            <ElOption
              key={index}
              label={item[label]}
              value={item[value]}
              disabled={item[disabled]}
            >
              {popoverAttrs && (
                <ElPopover {...{ attrs: popoverAttrs }}>
                  <div>{item[hint]}</div>
                  <div slot="reference">{item[label]}</div>
                </ElPopover>
              )}
            </ElOption>
          ))}
        </ElSelect>
      )
    },
  },

  'f-input': {
    mixins: [fieldMixins],
    render(h) {
      const { field, _renderProxy } = this
      const { attrs = {}, events = {}, domAttrs = {}, slots = {} } = field
      const dataObject = getProps(this, attrs, events, domAttrs)
      return (
        <ElInput {...dataObject}>
          {slots.prepend && (
            <template slot="prepend">
              {slots.prepend.call(_renderProxy, h)}
            </template>
          )}
          {slots.append && (
            <template slot="append">
              {slots.append.call(_renderProxy, h)}
            </template>
          )}
          {slots.prefix && (
            <template slot="prefix">
              {slots.prefix.call(_renderProxy, h)}
            </template>
          )}
          {slots.suffix && (
            <template slot="suffix">
              {slots.suffix.call(_renderProxy, h)}
            </template>
          )}
        </ElInput>
      )
    },
  },

  'f-button': {
    mixins: [fieldMixins],
    render(h) {
      const { field, _renderProxy } = this
      const {
        attrs = {},
        events = {},
        domAttrs = {},
        slots = {},
        text = '',
      } = field
      const dataObject = getProps(this, attrs, events, domAttrs)
      return (
        <ElButton {...dataObject}>
          {slots.default ? slots.default.call(_renderProxy, h) : text}
        </ElButton>
      )
    },
  },
}

export default {
  name: 'Field',
  mixins: [fieldMixins],
  components,
  render(h) {
    const { field, data } = this
    const fieldMap = {
      'input': <f-input field={field} data={data}></f-input>,
      'select': <f-select field={field} data={data}></f-select>,
      'button': <f-button field={field} data={data}></f-button>,
    };
    return fieldMap[field.type || 'input'];
  }
}