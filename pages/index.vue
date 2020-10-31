<template>
  <div class="container mb-5 mt-5">
    <Alertbox />
    <b-card class="mb-4 mt-4">
      <h2>"Joseph Henery Molinas Exam"</h2>
      <span class="add" @click="comment(null)">comment +</span>
    </b-card>
    <ul id="comments" v-if="items.length" style="padding: 0">
      <CommentItem
        v-for="(item, index) in items"
        :key="index"
        class="item"
        :item="item"
      />
    </ul>
    <b-form-group>
      <b-form-textarea
        v-model="data.comment"
        id="comment"
        placeholder="Comment"
        rows="3"
        no-resize
      />
    </b-form-group>
    <button type="button" class="btn btn-primary" @click="postComment">
      Post
    </button>
  </div>
</template>
<script>
import { mapActions, mapState, mapMutations } from "vuex";
import Comments from "~/models/Comment";
export default {
  data() {
    return {
      data: {
        comment: "",
        parent_id: null,
      },
    };
  },
  computed: {
    ...mapState("comments", ["items", "parent_id"]),
  },
  methods: {
    ...mapActions({
      getComments: "comments/fetch",
    }),
    ...mapMutations({
      setParentId: "comments/SET_PARENT_ID",
    }),
    postComment: async function () {
      try {
        this.data.parent_id = this.parent_id;
        await new Comments(this.data).save();
        await this.getComments();
        this.data = {
          comment: "",
          parent_id: null,
        };
      } catch (error) {
        console.log(error);
      }
    },
    comment: function (parentId) {
      this.setParentId(parentId);
      const input = document.getElementById("comment");
      input.focus();
    },
  },
  async mounted() {
    await this.getComments();
  },
};
</script>
