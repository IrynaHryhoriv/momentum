function getTimeOfDay() {
    const date = new Date();
    const hours = date.getHours();

    switch (Math.trunc(hours / 6)) {
      case 3: return 'evening';
        break;
      case 2: return 'afternoon';
        break;
      case 1: return 'morning';
        break;
      case 0: return 'night';
    }
  }
setInterval(getTimeOfDay, 1000);

console.log(setInterval);