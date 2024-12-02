import { ref, computed, onMounted, onUnmounted } from 'vue';

export default function useElapsedTime(startTime) {
  const now = ref(Date.now());

  const formattedLoginTime = computed(() => {
    if (startTime) {
      return new Date(startTime * 1000).toLocaleString();
    }
    return '';
  });

  const elapsedTime = computed(() => {
    if (!startTime) return '';
    
    const currentTime = now.value / 1000; // current time in seconds
    const secondsElapsed = Math.floor(currentTime - startTime);

    const hours = Math.floor(secondsElapsed / 3600);
    const minutes = Math.floor((secondsElapsed % 3600) / 60);
    const seconds = secondsElapsed % 60;

    return `${hours}h ${minutes}m ${seconds}s`;
  });

  let interval;

  onMounted(() => {
    interval = setInterval(() => {
      now.value = Date.now();
    }, 1000);
  });

  onUnmounted(() => {
    clearInterval(interval);
  });

  return { formattedLoginTime, elapsedTime };
}