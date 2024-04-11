<script>
  let items = [];

  const addItem = () => {
    // items[items.length] = `Item ${items.length + 1}`;
    items = [`Item ${items.length + 1}`, ...items];
  };

  let val = '';
  let inputItems = [];

  const onClick = () => {
    inputItems = [...inputItems, val];
    val = '';
  };
</script>

<button on:click={addItem}>Add item</button>

<p>Items:</p>
<ul>
  {#each items as item}
    <li>{item}</li>
  {/each}
</ul>

<br />----------------------<br />

<label for="item">Type in the item name:</label>
<input id="item" type="text" bind:value={val} /><br />
<button on:click={onClick}>Add</button>

<p>Items:</p>
<ul>
  {#each inputItems as item}
    <li>{item}</li>
  {/each}
</ul>
<p>
  The list has {inputItems.length}
  {inputItems.length === 1 ? 'item' : 'items'}.
</p>
