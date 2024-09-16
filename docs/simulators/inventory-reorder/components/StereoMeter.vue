<template>
  <div class="stereo-meter">
    <div 
      v-for="i in 10" 
      :key="i" 
      class="meter-rectangle" 
      :class="{ 'lit': (value / 10) >= (11 - i) }"
    ></div>
    {{ label }}
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  value: {
    type: Number,
    required: true,
    validator: (value) => value >= 0 && value <= 100
  },
  label: {
    type: String,
    required: false,
  }

});

const litSegments = computed(() => Math.floor(props.value / 10));
</script>

<style scoped>
.stereo-meter {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 80px;
/*  background-color: #2c2c2c;*/
  padding: 10px;
  border-radius: 5px;
}

.meter-rectangle {
  height: 16px;
  background-color: var(--vp-c-border);
  border-radius: 3px;
  transition: background-color 0.2s ease;
}

.meter-rectangle.lit {
  background-color: var(--p-primary-color);
/*  background-color: rgb(32 182 94);*/
/*  box-shadow: 0 0 5px #00ff00;*/
}
</style>