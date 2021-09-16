<template>
  <div :class="{ hidden: hidden }" class="pagination-container">
    <el-pagination
      v-bind="$attrs"
      :background="background"
      v-model:value:current-page="currentPage"
      v-model:value:page-size="pageSize"
      :layout="layout"
      :page-sizes="pageSizes"
      :pager-count="pagerCount"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
import { $on, $off, $once, $emit } from '../../utils/gogocodeTransfer'
import { scrollTo } from '@/utils/scroll-to'

export default {
  name: 'Pagination',
  props: {
    total: {
      required: true,
      type: Number,
    },
    page: {
      type: Number,
      default: 1,
    },
    limit: {
      type: Number,
      default: 20,
    },
    pageSizes: {
      type: Array,
      default() {
        return [10, 20, 30, 50]
      },
    },
    // 移动端页码按钮的数量端默认值5
    pagerCount: {
      type: Number,
      default: document.body.clientWidth < 992 ? 5 : 7,
    },
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper',
    },
    background: {
      type: Boolean,
      default: true,
    },
    autoScroll: {
      type: Boolean,
      default: true,
    },
    hidden: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    currentPage: {
      get() {
        return this.page
      },
      set(val) {
        $emit(this, 'update:page', val)
      },
    },
    pageSize: {
      get() {
        return this.limit
      },
      set(val) {
        $emit(this, 'update:limit', val)
      },
    },
  },
  methods: {
    handleSizeChange(val) {
      $emit(this, 'pagination', { page: this.currentPage, limit: val })
      if (this.autoScroll) {
        scrollTo(0, 800)
      }
    },
    handleCurrentChange(val) {
      $emit(this, 'pagination', { page: val, limit: this.pageSize })
      if (this.autoScroll) {
        scrollTo(0, 800)
      }
    },
  },
  emits: ['update:page', 'update:limit', 'pagination'],
}
</script>

<style scoped>
.pagination-container {
  background: #fff;
  padding: 32px 16px;
}
.pagination-container.hidden {
  display: none;
}
</style>
