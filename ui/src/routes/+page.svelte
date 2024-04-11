<script>
  // JavaScript goes here
  import BestJoke from '../components/BestJoke.svelte';
  import LivingLocations from '../components/LivingLocations.svelte';
  import AgeDescription from '../components/AgeDescription.svelte';
  import Counter from '../components/Counter.svelte';
  import Password from '../components/Password.svelte';
  import List from '../components/List.svelte';
  import Location from '../components/Location.svelte';
  // let { name } = $props();
  let name = 'Elle';
  // let age = $state(0);
  let age = 0;

  const grow = () => {
    age++;
  };
</script>

<!-- HTML template goes here -->
<p>My name is {name}. I am {age} year{age == 1 ? '' : 's'} old.</p>

<!-- {age} is shorthand for age={age} -->
<AgeDescription {age} />

----------------<br />

<button on:click={grow}>Grow</button>

<LivingLocations />

----------------<br />

<BestJoke />

----------------<br />

<Counter />

<br />---------------<br />

<Password />

<br />----------------<br />

<List />

<br />----------------<br />

<Location />

<style>
  /* CSS goes here */
</style>
