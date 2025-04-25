export const getMarkedDates = (agendaData) => {
  const marked = {};

  agendaData.forEach((section) => {
    const date = section.title; // Tarih bilgisi
    const events = section.data; // Bu tarihe ait etkinlikler

    // Eğer bu tarihte etkinlik yoksa işaretleme yapma
    if (!events || events.length === 0) return;

    // Varsayılan arka plan rengi
    let backgroundColor = "#00ADF5";

    // Kategorilere göre arka plan rengi belirleme
    const categoryColorMap = {
      Aile: "#00A173",
      Arkadaş: "#FFB90B",
      Kişisel: "#AA7BFF",
      İş: "#E74779",
    };

    for (const [category, color] of Object.entries(categoryColorMap)) {
      if (events.some((event) => event.category === category)) {
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
  });

  return marked;
};
