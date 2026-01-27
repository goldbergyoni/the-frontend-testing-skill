<script setup>
const lines = [
  { text: '# The Test Verifier Agent', highlight: false },
  { text: '', highlight: false },
  { text: '## At a Glance', highlight: false },
  { text: '', highlight: false },
  { text: '| Metric                     | Status       |', highlight: false },
  { text: '| -------------------------- | ------------ |', highlight: false },
  { text: '| Spec Tests Coded           | 12/12 (100%) |', highlight: true },
  { text: '| Spec Tests Passing         | 12/12 (100%) |', highlight: true },
  { text: '| Best Practices Concerns    | 3            |', highlight: false },
  { text: '| Coverage Increase          | +5.76%       |', highlight: true },
];
</script>

<template>
  <div class="font-mono text-xs bg-gray-900 rounded-lg p-4 overflow-hidden">
    <div
      v-for="(line, index) in lines"
      :key="index"
      class="relative flex items-center h-6"
    >
      <!-- Arrow indicator that appears on click -->
      <v-click :at="index + 1">
        <span class="absolute -left-1 text-yellow-400 animate-pulse">
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fill-rule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </span>
      </v-click>

      <!-- Hide arrow after next click -->
      <v-click :at="index + 2" hide>
        <span class="absolute -left-1 text-yellow-400">
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fill-rule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </span>
      </v-click>

      <!-- Line content -->
      <v-click :at="index + 1">
        <span
          class="pl-5"
          :class="{
            'text-green-400 font-semibold': line.highlight,
            'text-gray-300': !line.highlight,
          }"
        >
          {{ line.text || '\u00A0' }}
        </span>
      </v-click>
    </div>
  </div>
</template>

<style scoped>
@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
.animate-pulse {
  animation: pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>
