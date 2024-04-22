<script>
  let dog = 'https://images.dog.ceo/breeds/pekinese/n02086079_10721.jpg';

  const fetchRandomDog = async () => {
    const response = await fetch('https://dog.ceo/api/breeds/image/random');
    const data = await response.json();
    dog = data.message;
  };
</script>

<button on:click={fetchRandomDog}>Fetch new dog</button>

<br />

<img src={dog} alt="A dog" />
