module.exports = async function (input) {
  function isBrokenFile(file) {
    // Если удалён
    if (typeof file !== "string") {
      return false;
    }
    // Если повреждён
    for (let i = 1; i < file.length; i++) {
      if (file[i] == file[i - 1]) {
        return true;
      }
    }
    // Если нормальный
    return false;
  }

  function getSize(folder) {
    return new Promise((resolve) => {
      folder.size((size) => resolve(size));
    });
  }

  function readFile(folder, idx) {
    return new Promise((resolve) => {
      folder.read(idx, (file) => resolve(file));
    });
  }

  async function traverse(folder) {
    const size = await getSize(folder);

    for (let i = 0; i < size; i++) {
      const file = await readFile(folder, i);
      if (typeof file === "string") {
        if (isBrokenFile(file)) {
          result.push(file);
        }
      } else if (file && typeof file === "object") {
        await traverse(file);
      }
    }
  }
  return result;
};
