<script>
  import { fetchFinnishNameDay } from '../http-actions/nameday-api.js';
  let nameday = '';

  const day = 1;
  const month = 1;

  const fetchNameDay = async () => {
    nameday = await fetchFinnishNameDay(day, month);
  };
</script>

<button on:click={fetchNameDay}>Fetch nameday</button>

<p>Nameday: {nameday}</p>
