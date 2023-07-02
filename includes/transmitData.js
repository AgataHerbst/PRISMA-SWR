export default async function transmitData(data, path) {
    try {
      const response = await fetch(`/api/${path}`, {
        method: 'POST',
        body: data
      });
      console.log('transmitData response', response);
      if (!response.ok) throw new Error('не ок');
      const json = await response.json();
      console.log('json', json);
      return [...data, json];
    } catch (error) {
      null;
    }
  }