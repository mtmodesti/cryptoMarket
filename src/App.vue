<script setup></script>

<template>

<!-- bgAnimated -->
  <div
    class="min-w-screen overflow-y-auto min-h-screen bgAnimated "
  >
    <div class="flex flex-col items-center">
      <h1
        class="
        titlePage rounded-b-full text-center text-5xl font-mono tracking-wider uppercase font-medium w-2/3  bg-gradient-to-r from-sky-500 to-indigo-500 text-sky-400"
      >
        Crypto Market
      </h1>

      <div class="flex items-center justify-around gap-5 m-8 text-center">
        <div
          class="resizeDiv flex border-solid border-2 border-sky-500 flex-col justify-evenly items-center rounded-2xl bg-sky-700 w-2/4 h-48 gap-4"
        >
          <p class="w-10/12 text-center text-cyan-200">
            Search the price of the crypto coin today!
          </p>
          <input
            class="rounded-md border-2 border-sky-500 flex bg-sky-600 text-center  w-3/5 placeholder:text-white hover:text-white transition-colors text-white"
            type="text"
            placeholder="Search"
            @keyup="searchCoin()"
            v-model="textSearch"
          />
        </div>

        <div
          class="resizeDiv border-solid rounded-2xl border-2 border-sky-500 flex flex-col gap-4 my-1 items-center bg-sky-700 h-48 w-2/4"
        >
          <span class="text-cyan-200">Search coin historical</span>
          <input
            id="dateInput"
            type="date"
            class="border-solid border-2 border-sky-500 rounded-md w-4/5 text-center text-sm"
          />
          <input
            id="coinName"
            type="text"
            class="rounded-2xl placeholder:text-neutral-900 border-solid border-2 border-sky-500 w-3/5 text-center text-sm "
            placeholder="Coin name"
          />
          <modal/>
        </div>
      </div>

      <div
        class="rounded-lg w-4/5 flex items-center border-solid border-2 border-sky-500 overflow-x-auto
        
        max-h-xl"
      >
        <table class="w-full overflow-x-auto border-separate">
          <thead>
            <tr class="bg-sky-500 text-white underline text-5xl h-10 ">
              <th class="text-sm" v-for="title in titles" :key="title">
                {{  title }}
              </th>
            </tr>
          </thead>
          <tbody class="text-lg ">
            <tr
              class="text-center hover:bg-sky-300 bg-sky-100 lineTable "
              v-for="(coin, index) in filteredCoins"
              :key="coin.id"
            >
              <td
                class=""
              >
                {{ index + 1 }}
              </td>
              <td class="flex justify-center">
                <img :src="coin.image" style="width: 2rem" />
              </td>
              <td class="">
                {{ coin.symbol }}
              </td>
              <td class="whitespace-nowrap">
                {{ coin.name }}
              </td>

              <td class="whitespace-nowrap animate-pulse">
                $ {{ coin.current_price.toFixed(2) }}
              </td>

              <td
                :class="[
                  coin.price_change_percentage_24h >= 0
                    ? 'text-green-600'
                    : 'text-red-600',
                ]"
              >
                {{ coin.price_change_percentage_24h }} %
              </td>

              <td class="whitespace-nowrap animate-pulse">
                ${{ coin.total_volume.toLocaleString() }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>



      
    </div>
  </div>
</template>

<style scoped>
.titlePage {
  text-shadow: 0 0.1em 20px rgba(0, 0, 0, 1), 0.05em -0.03em 0 rgba(0, 0, 0, 1),
    0.05em 0.005em 0 rgba(0, 0, 0, 1), 0em 0.08em 0 rgba(0, 0, 0, 1),
    0.05em 0.08em 0 rgba(0, 0, 0, 1), 0px -0.03em 0 rgba(0, 0, 0, 1),
    -0.03em -0.03em 0 rgba(0, 0, 0, 1), -0.03em 0.08em 0 rgba(0, 0, 0, 1), -0.03em 0 0 rgba(0, 0, 0, 1);
    
}


.lineTable{
transition: 0.3s;

}

:hover.lineTable{
transition: 1s;
transform: scale(1.02);
}

.bgAnimated {
  background: linear-gradient(-45deg, #1970a5, #171979, #23657d, #2853ef);
	background-size: 400% 400%;
	animation: gradient 15s ease infinite;
	height: 100vh;
}


@keyframes gradient {
	0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}
}

.resizeDiv {
  transition: 2s;
}

:hover.resizeDiv{
  transition: 2s;
  box-shadow: 10px 5px 5px black;
  background-color: #0C4A6E;
}

</style>


<script>
import modal from "./components/modal.vue";

export default {
  name: "App",

  components: {
    modal,
  },

  data() {
    return {
      coins: [],
      titles: [
        "#",
        "Symbol",
        "abbreviation",
        "Coin",
        "Price",
        "Price change",
        "24h Volume",
      ],
      textSearch: "",
      filteredCoins: [],
      datedData: [],
    };
  },
  mounted() {
    setInterval(this.getData, 10);
  },

  methods: {
    searchCoin() {
      this.filteredCoins = this.coins.filter(
        (coin) =>
          coin.name.toLowerCase().includes(this.textSearch.toLowerCase()) ||
          coin.symbol.toLowerCase().includes(this.textSearch.toLowerCase())
      );
    },

    async getData() {
      const res = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&parkline=false"
      );
      const data = await res.json();
      this.coins = data;
      this.filteredCoins = data;
      this.searchCoin();
    },
  },
};
</script>
