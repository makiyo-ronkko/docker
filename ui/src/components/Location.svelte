<script>
  import { useLocationStore } from '../stores/location.svelte';

  const { subscribe, up, down, left, right } = useLocationStore();

  let location = { x: 0, y: 0 };

  subscribe((value) => {
    location = value;
  });
</script>

<p>At ({location.x}, {location.y})</p>
<table>
  <tbody>
    <tr>
      <td></td>
      <td>
        <button on:click={() => up()}>Up</button>
      </td>
      <td></td>
    </tr>
    <tr>
      <td>
        <button on:click={() => left()}>Left</button>
      </td>
      <td>
        <button on:click={() => down()}>Down</button>
      </td>
      <td>
        <button on:click={() => right()}>Right</button>
      </td>
    </tr>
  </tbody>
</table>
