export default {
  "all": {
    name: "Tout",
    id: "all",
    fn: function(data) {
      return data;
    }
  },
  "inferior-10": {
    name: "Inférieur a 10",
    id: "inferior-10",
    fn: function(data) {
      const result = {};
      for(let key in data) {
        if (data[key].value < 10) result[key] = data[key];
      }
      return result;
    }
  },
  "inferior-15": {
    name: "Inférieur a 15",
    id: "inferior-15",
    fn: function(data) {
      const result = {};
      for(let key in data) {
        if (data[key].value < 15) result[key] = data[key];
      }
      return result;
    }
  },
  "inferior-20": {
    name: "Inférieur a 20",
    id: "inferior-20",
    fn: function(data) {
      const result = {};
      for(let key in data) {
        if (data[key].value < 20) result[key] = data[key];
      }
      return result;
    }
  },
  "inferior-25": {
    name: "Inférieur a 25",
    id: "inferior-25",
    fn: function(data) {
      const result = {};
      for(let key in data) {
        if (data[key].value < 25) result[key] = data[key];
      }
      return result;
    }
  },
  "inferior-30": {
    name: "Inférieur a 30",
    id: "inferior-30",
    fn: function(data) {
      const result = {};
      for(let key in data) {
        if (data[key].value < 30) result[key] = data[key];
      }
      return result;
    }
  },
  "inferior-35": {
    name: "Inférieur a 35",
    id: "inferior-35",
    fn: function(data) {
      const result = {};
      for(let key in data) {
        if (data[key].value < 35) result[key] = data[key];
      }
      return result;
    }
  },
  "inferior-40": {
    name: "Inférieur a 40",
    id: "inferior-40",
    fn: function(data) {
      const result = {};
      for(let key in data) {
        if (data[key].value < 40) result[key] = data[key];
      }
      return result;
    }
  },
}
