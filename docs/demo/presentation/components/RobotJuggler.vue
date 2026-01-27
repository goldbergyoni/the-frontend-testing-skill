<script setup>
// Robot juggling test-related items
const juggleItems = [
  { icon: 'plan', label: 'Plan', color: '#10b981' },
  { icon: 'analyze', label: 'Analyze', color: '#3b82f6' },
  { icon: 'write', label: 'Write', color: '#f59e0b' },
  { icon: 'heal', label: 'Heal', color: '#ef4444' },
  { icon: 'verify', label: 'Verify', color: '#8b5cf6' },
];
</script>

<template>
  <div class="robot-container">
    <!-- Juggling items in arc -->
    <div class="juggle-arc">
      <div
        v-for="(item, index) in juggleItems"
        :key="item.label"
        class="juggle-item"
        :style="{
          '--delay': `${index * 0.15}s`,
          '--color': item.color,
        }"
      >
        <div class="item-circle" :style="{ background: item.color }">
          <span class="item-icon">{{ index + 1 }}</span>
        </div>
        <span class="item-label">{{ item.label }}</span>
      </div>
    </div>

    <!-- Robot body -->
    <div class="robot">
      <!-- Head -->
      <div class="robot-head">
        <div class="robot-eye left"></div>
        <div class="robot-eye right"></div>
        <div class="robot-antenna"></div>
      </div>

      <!-- Body -->
      <div class="robot-body">
        <div class="robot-screen">
          <span class="screen-text">TEST</span>
        </div>
      </div>

      <!-- Arms -->
      <div class="robot-arm left"></div>
      <div class="robot-arm right"></div>
    </div>
  </div>
</template>

<style scoped>
.robot-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  position: relative;
}

.juggle-arc {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-bottom: 1rem;
}

.juggle-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: juggle 1.5s ease-in-out infinite;
  animation-delay: var(--delay);
}

@keyframes juggle {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

.item-circle {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s;
}

.item-circle:hover {
  transform: scale(1.1);
}

.item-icon {
  font-size: 1.25rem;
  font-weight: bold;
  color: white;
}

.item-label {
  margin-top: 0.5rem;
  font-size: 0.75rem;
  color: #94a3b8;
  font-weight: 500;
}

.robot {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.robot-head {
  width: 80px;
  height: 60px;
  background: linear-gradient(135deg, #64748b, #475569);
  border-radius: 15px 15px 10px 10px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
}

.robot-eye {
  width: 15px;
  height: 15px;
  background: #22d3ee;
  border-radius: 50%;
  box-shadow: 0 0 10px #22d3ee;
  animation: blink 3s infinite;
}

@keyframes blink {
  0%,
  90%,
  100% {
    opacity: 1;
  }
  95% {
    opacity: 0.3;
  }
}

.robot-antenna {
  position: absolute;
  top: -15px;
  width: 6px;
  height: 20px;
  background: #64748b;
  border-radius: 3px;
}

.robot-antenna::after {
  content: '';
  position: absolute;
  top: -8px;
  left: -4px;
  width: 14px;
  height: 14px;
  background: #22d3ee;
  border-radius: 50%;
  box-shadow: 0 0 15px #22d3ee;
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
    box-shadow: 0 0 15px #22d3ee;
  }
  50% {
    opacity: 0.7;
    box-shadow: 0 0 25px #22d3ee;
  }
}

.robot-body {
  width: 100px;
  height: 80px;
  background: linear-gradient(135deg, #475569, #334155);
  border-radius: 10px;
  margin-top: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
}

.robot-screen {
  width: 60px;
  height: 40px;
  background: #0f172a;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #22d3ee;
}

.screen-text {
  color: #22d3ee;
  font-family: monospace;
  font-size: 0.875rem;
  font-weight: bold;
  animation: screenGlow 2s infinite;
}

@keyframes screenGlow {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

.robot-arm {
  position: absolute;
  width: 15px;
  height: 50px;
  background: linear-gradient(135deg, #64748b, #475569);
  border-radius: 8px;
  top: 70px;
}

.robot-arm.left {
  left: -20px;
  transform: rotate(-30deg);
  transform-origin: top center;
  animation: waveLeft 1.5s ease-in-out infinite;
}

.robot-arm.right {
  right: -20px;
  transform: rotate(30deg);
  transform-origin: top center;
  animation: waveRight 1.5s ease-in-out infinite;
}

@keyframes waveLeft {
  0%,
  100% {
    transform: rotate(-30deg);
  }
  50% {
    transform: rotate(-45deg);
  }
}

@keyframes waveRight {
  0%,
  100% {
    transform: rotate(30deg);
  }
  50% {
    transform: rotate(45deg);
  }
}
</style>
