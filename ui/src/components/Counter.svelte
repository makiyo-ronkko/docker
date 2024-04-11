<script>
  import { useCountStore } from '../stores/counter.svelte';
  import { onMount } from 'svelte';

  let initialCount = 0;
  if (typeof window !== 'undefined' && localStorage.hasOwnProperty('count')) {
    initialCount = parseInt(localStorage.getItem('count'));
  }

  let count = initialCount;
  let mouse = { x: 0, y: 0 };
  let key = '';
  let keystrokeCount = 0;
  let text = '';
  let disabled = false;
  let selected = '';

  const { subscribe, increment } = useCountStore();

  // Subscribe to updates from the counter store
  onMount(() => {
    const unsubscribe = subscribe((value) => {
      count = value;
    });

    return unsubscribe;
  });

  const mouseMove = (event) => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
  };

  const showKey = (event) => {
    keystrokeCount++;
    key = event.key;
  };

  const resetVariables = () => {
    text = '';
    disabled = false;
    selected = '';
  };

  const keyUp = (event) => {
    if (event.key === 'Enter') {
      resetVariables();
    }
  };
</script>

<button on:mouseenter={increment} on:click={increment} on:mousemove={mouseMove}>
  Hovered or clicked {count} times.
</button>

<p>
  Mouse moved at x: {mouse.x}, y: {mouse.y}
</p>

<textarea on:keyup={showKey} />

<p>
  Last key pressed: {key}, total keystrokes: {keystrokeCount}
</p>

<p>
  Text: {text}
</p>
<input type="text" bind:value={text} {disabled} on:keyup={keyUp} />
Typing disabled <input type="checkbox" bind:checked={disabled} />
<button on:click={resetVariables}>Reset</button>

<select bind:value={selected}>
  <option value="">Select an option</option>
  <option value="1">Option 1</option>
  <option value="2">Option 2</option>
</select>
