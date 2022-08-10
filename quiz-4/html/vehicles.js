const loadData = async () => {
  /**
   * load data from https://6253799f90266e3d0e0373e6.mockapi.io/ok/user
   */
   const result = await fetch(`https://6253799f90266e3d0e0373e6.mockapi.io/ok/user`);
   const data = await result.json();
   return data;
};

loadData().then((data) => {
  console.log(data);
  const list = document.getElementById(`vehicles`);
  data.map(({vehicle}) =>{
    const html = `
    <article>
      <h4>State: ${vehicle[0].manufacturer}</h4>
      <h4>------------</h4>
    </article>
    `;
    list.insertAdjacentHTML("beforeend", html);
  })
});

