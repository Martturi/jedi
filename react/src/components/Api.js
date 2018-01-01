
  export const saveCV = (uid, text) => {
    return new Promise( async (resolve, reject) => {
      const response = await
      fetch(`api/${uid}`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({text: text}),
      })
      if (response.status !== 200) reject("error " + response)
      else resolve("Save succeeded.")
    })
  }

  export const loadCV = async (uid) => {
    const response = await fetch(`api/${uid}`)
    const body = await response.text()
    console.log(body)
    if (response.status !== 200) throw Error(body.message)
    return body
  }