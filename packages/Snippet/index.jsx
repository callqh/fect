import { computed, ref } from 'vue'
import { createNameSpace, validator, theme } from '../utils'
import SnippetIcon from './snippet.icon'
import Toast from '../Toast'

const [createComponent] = createNameSpace('Snippet')
const { snippetCopyTypes, normalTypes } = theme

import './snippet.less'

export default createComponent({
  props: {
    text: {
      type: String,
      default: '',
      require: true,
    },
    width: {
      type: [String, Number],
      default: 'initial',
    },
    fill: Boolean,
    type: {
      type: String,
      default: 'default',
      validator: validator.enums(normalTypes),
    },
    copy: {
      type: String,
      default: 'default',
      validator: validator.enums(snippetCopyTypes),
    },
    symbol: {
      type: String,
      default: '$',
    },
    toastText: {
      type: String,
      default: 'Copied to clipboard!',
    },
    toastType: {
      type: String,
      default: 'success',
      validator: validator.enums(normalTypes),
    },
  },
  setup(props) {
    const { copy, toastType, width, type, symbol, toastText, fill } = props
    const showCopyIcon = ref(copy !== 'prevent')
    const getSnippetClass = computed(() => {
      let str = ''
      type && (str += ` ${type}`)
      fill && (str += ' fill')
      !showCopyIcon.value && (str += ' disabled')
      return str.trim()
    })

    const clickCopyHandler = () => {
      if (copy !== 'default') {
        return console.log('3')
      }
      Toast({ text: toastText, type: toastType })
    }

    return () => (
      <div class={`fect-snippet ${getSnippetClass.value}`} style={{ width }}>
        <span>
          {symbol && <span>{symbol}</span>}
          {props.text}
        </span>
        {showCopyIcon.value && (
          <div class="fect-snippet_copy" onClick={clickCopyHandler}>
            <SnippetIcon />
          </div>
        )}
      </div>
    )
  },
})
