function submitCode(element, out, langselect, inputcheckbox, custominput) {
  const code = element.getValue();
  const checkbox = inputcheckbox.val();
  const input = custominput.val();
  const lang = langselect.val();
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
    'lang' : lang
  }).done((output) => {
    // TODO: format and display the output as needed
    console.log(out);
    out.html(output);
    console.log(output);
  });
}
