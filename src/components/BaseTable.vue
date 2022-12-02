<template>
  <DxDataGrid
    noDataText="Không có dữ liệu"
    id="msp-table-wrapper"
    :show-borders="false"
    class="h-full w-full"
    :data-source="data"
    :allow-column-reordering="true"
    :allow-column-resizing="true"
    :keyExpr="rowID"
    :onRowDblClick="(e) => $emit('handleRowDblClick', e.key)"
  >
    <template v-for="(fieldRender, index) in listFieldRender" :key="index">
      <DxColumn
        :visible="fieldRender?.isRender"
        :min-width="100"
        :width="fieldRender?.width"
        alignment="left"
        :data-field="fieldRender?.fieldName"
        :caption="fieldRender?.fieldDisplay"
        cell-template="cellCustom"
      >
      </DxColumn>
    </template>
    <DxColumn
      class="pd-0"
      :allow-reordering="false"
      :allow-resizing="false"
      width="90"
      cell-template="cellControl"
    />

    <template #cellCustom="{ data }">
      <slot :data="data" :name="data.column.dataField">
        <div class="text-ellipsis" :title="data.value">
          {{ data.value }}
        </div>
      </slot>
    </template>

    <template #cellControl="{ data }">
      <div
        class="msp-cell-control-wrapper flex align-items-center flex-end h-full w-full"
      >
        <div
          @click="$emit('editRow', data.key)"
          class="msp-cell-control border-circle flex-center m-r-8"
        >
          <div class="msp-cell-control-update"></div>
        </div>

        <div
          @click="$emit('deleteRow', data.key)"
          class="msp-cell-control border-circle flex-center"
        >
          <div class="msp-cell-control-delete msp-icon-24 msp-icon"></div>
        </div>
      </div>
    </template>

    <DxPaging :enabled="false" />
  </DxDataGrid>
</template>

<script>
import { DxDataGrid, DxColumn, DxPaging } from "devextreme-vue/data-grid";
export default {
  components: {
    DxDataGrid,
    DxColumn,
    DxPaging,
  },
  props: {
    //Data sẽ render
    data: {
      type: Array,
      required: true,
    },

    //Thông tin các field sẽ render
    listFieldRender: {
      type: Array,
      required: true,
    },

    //Tên field id
    rowID: String,
  },
};
</script>

<style scoped></style>
