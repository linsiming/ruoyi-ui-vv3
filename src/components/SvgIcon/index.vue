<template>
  <div
    v-bind="$attrs"
    v-if="isExternalIcon"
    :style="styleExternalIcon"
    class="svg-external-icon svg-icon"
  />
  <svg v-bind="$attrs" v-else :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName" :fill="color" />
  </svg>
</template>

<script>
import { isExternal } from '@/utils/validate'
import {computed, defineComponent} from 'vue'
// import ids from 'virtual:svg-icons-names'

export default defineComponent({
  props: {
    iconClass: {
      type: String,
      required: true,
    },
    className: {
      type: String,
      default: '',
    },
    color: {
      type: String,
      default: '#889aa4',
    },
    styleExternalIcon: {
      type: Object,
      default: {}
    },
    isExternalIcon: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    return {
      isExternalIcon: computed(() => {
        // console.log('isExternal---', isExternal(props.iconClass), ids)
        return isExternal(props.iconClass)
      }),
      iconName: computed(() => {
        // console.log('iconName---', `#icon-${props.iconClass}`)
        return `#icon-${props.iconClass}`
      }),
      svgClass: computed(() => {
        // console.log('svgClass---', props.className)
        if (props.className) {
          return `svg-icon ${props.className}`
        }
        return 'svg-icon'
      }),
      styleExternalIcon: computed(() => {
        // console.log('styleExternalIcon', `url(${props.iconClass})`)
        return {
          mask: `url(${props.iconClass}) no-repeat 50% 50%`,
          '-webkit-mask': `url(${props.iconClass}) no-repeat 50% 50%`,
        }
      })
    }
  }
})

</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
.svg-external-icon {
  background-color: currentColor;
  mask-size: cover !important;
  display: inline-block;
}
</style>
