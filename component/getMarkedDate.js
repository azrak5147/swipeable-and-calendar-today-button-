export const getMarkedDates = (agendaData) => {
  const marked = {};

  for (const date in agendaData) {
    if (!agendaData[date]) continue;

    // Varsayılan arka plan rengi
    let backgroundColor = "#00ADF5";

    // Kategorilere göre arka plan rengi ve ikon belirleme
    const categoryColorMap = {
      Aile: "#00A173",
      Arkadaş: "#FFB90B",
      Kişisel: "#AA7BFF",
      İş: "#E74779",
    };

    for (const [key, color] of Object.entries(categoryColorMap)) {
      if (agendaData[date].some((item) => item.category === key)) {
        backgroundColor = color;

        break;
      }
    }

    marked[date] = {
      customStyles: {
        container: { backgroundColor: backgroundColor },
        text: { color: "white" },
      },
    };
  }
  return marked;
};
