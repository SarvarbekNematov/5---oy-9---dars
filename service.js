export const getData = async () => {
  try {
    const res = await fetch("http://localhost:3000/photos");
    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getSingleData = async (id) => {
  try {
    const res = await fetch(`http://localhost:3000/photos/${id}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
