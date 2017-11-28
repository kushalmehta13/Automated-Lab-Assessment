function submitCode(element, out, langselect, inputcheckbox, custominput, q_id) {
  const code = element.getValue();
  const checkbox = inputcheckbox.val();
  const input = custominput.val();
  const lang = langselect.val();
  const email = sessionStorage.getItem("email").toString();
  check = "";
  if(checkbox == 'on') {
    check = 'true';
  }
  else {
    check = 'false';
  }

  $.post('/compilecode', {
    'code' : code,
    'input' : input,
    'inputRadio' : 'false',
    'lang' : lang,
    'email' : email,
    'q_id' : q_id.toString()
  }).done((output) => {
    // TODO: format and display the output as needed
    out.html(output['m']);
    console.log(output['m']);
  });
}
