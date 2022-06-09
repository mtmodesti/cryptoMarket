<script setup>
import { ref } from "vue";

const open = ref(false);
</script>

<template>
  <div
    v-if="open"
    class="modal text-xl bg-cyan-700 h-96 flex justify-around items-center flex-col shadow-2xl rounded-2xl text-white shadow-black"
  >
    <button
      class="bg-cyan-900 w-44 hover:bg-sky-400 rounded-xl hover:text-black transition-colors text-white"
      @click="open = false"
    >
      Close
    </button>
  </div>
</template>

<style scoped>
.modal {
  position: fixed;
  z-index: 999;
  top: 20%;
  left: 50%;
  width: 300px;
  margin-left: -150px;
}
</style>

<script>
export default {
  name: "modalError",

  components: {
    modalError,
  },
};
</script>
