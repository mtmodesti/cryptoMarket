<script setup>
import { ref } from "vue";

const open = ref(false);
const openError = ref(false);
</script>

<template>
  <button
    class="bg-sky-600 m-2 border-2 border-sky-500 rounded-2xl w-8/12 hover:bg-sky-900 hover:text-white transition-colors text-white"
    @click="getCoinData()"
  >
    Search
  </button>

  <div
    v-if="open"
    class="modal text-xl bg-cyan-700 h-96 flex justify-around items-center flex-col shadow-2xl rounded-2xl text-white shadow-black"
  >
    <p class="flex justify-center items-center text-center">
      Cryptocurrency researched:
    </p>
    <p class="underline">{{ this.name }}</p>
    <p class="flex justify-center items-center text-center">Date searched:</p>
    <p class="underline">{{ this.date }}</p>
    <p class="flex justify-center items-center text-center">
      The price of the {{ this.name }} in the date of {{ this.date }} in Dollars
      is:
    </p>
    <p class="underline flex justify-center items-center text-center">
      USD {{ this.pastPrice }}
    </p>
    <button
      class="bg-cyan-900 w-44 hover:bg-sky-400 rounded-xl hover:text-black transition-colors text-white"
      @click="closeModalFunction()"
    >
      Close
    </button>
  </div>

  <div
    v-if="openError"
    class="modal text-xl bg-cyan-700 h-96 flex justify-around items-center flex-col shadow-2xl rounded-2xl text-white shadow-black"
  >
    <p class="w-3/4">
      Sorry. But we do not have information about the data that has been given.
      Confirm the info's and try again.
    </p>
    <button
      class="bg-cyan-900 w-44 hover:bg-sky-400 rounded-xl hover:text-black transition-colors text-white"
      @click="closeModalFunction()"
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
  animation: openModalAnimation ease-in-out 0.7s;
  left: 50%;
  width: 300px;
  margin-left: -150px;
}

@keyframes openModalAnimation {
  0% {
    opacity: 0;

    color: transparent;
    transform: rotate(45deg);
  }

  100% {
    opacity: 1;
  }
}

.closeModal {
  animation: closeModalAnimation ease-in-out 1s;
}

@keyframes closeModalAnimation {
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
}
</style>

<script>
export default {
  name: "modal",

  components: {},

  data() {
    return {
      name: "",
      symbolURL: "",
      date: "",
      pastPrice: "",
    };
  },

  methods: {
    async getCoinData() {
      

      let dateInput = document.querySelector("#dateInput");
      let year = dateInput.value.replaceAll("-", " ").split(" ")[0];
      let month = dateInput.value.replaceAll("-", " ").split(" ")[1];
      let day = dateInput.value.replaceAll("-", " ").split(" ")[2];

      let coinInput = document.querySelector("#coinName").value.toLowerCase();

      let res = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinInput}/history?date=${day}-${month}-${year}`
      );

      try {
        let data = await res.json();
        this.name = data.id;
        this.date = dateInput.value;
        this.pastPrice = data.market_data.current_price.usd.toFixed(2);
        this.open = true;
      } catch {
        this.openError = true;
      }
    },
    closeModalFunction() {
      let modal = document.querySelectorAll(".modal")[0];
      modal.classList.add("closeModal");
      setTimeout(() => {
        this.openError = false;
        this.open = false;
      }, 1000);
    },
  },
};
</script>
