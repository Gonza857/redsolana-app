export async function deleteCasinoImage(image_id) {
  try {
    const desertRef = ref(storage, `casinos/${image_id}`);
    await deleteObject(desertRef);
    console.log("borrada correctamente");
  } catch (error) {
    throw new Error("Ooops! Algo salio mal.");
  }
}
