const getCount = async () => {
  const res = await fetch('http://localhost:8000/count');
  const data = await res.json();
  return data.count;
};

const incrementCount = async () => {
  await fetch('http://localhost:8000/count', { method: 'POST' });
};

export { getCount, incrementCount };
