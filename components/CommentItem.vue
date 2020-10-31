<template>
  <li>
    <b-card class="mb-4">
      <b-card-text :class="{ parent: isFolder }" @click="toggle"
        >{{ item.comment
        }} <span v-if="isFolder">[{{ isOpen ? "-" : "+" }}]</span></b-card-text
      >
      <span class="add" @click="comment(item.id)">comment +</span>
    </b-card>
    <ul v-show="isOpen" v-if="isFolder">
      <node
        class="item"
        v-for="(child, index) in item.children"
        :key="index"
        :item="child"
      />
    </ul>
  </li>
</template>
<script>
import { mapMutations } from "vuex";
export default {
  name: "node",
  props: {
    item: Object,
  },
  data: function () {
    return {
      isOpen: false,
    };
  },
  computed: {
    isFolder: function () {
      return this.item.children && this.item.children.length;
    },
  },
  methods: {
    ...mapMutations({
      setParentId: "comments/SET_PARENT_ID",
    }),
    toggle: function () {
      if (this.isFolder) {
        this.isOpen = !this.isOpen;
      }
    },
    comment: function (parentId) {
      this.setParentId(parentId);
      const input = document.getElementById('comment');
      input.focus();
    },
  },
};
</script>