function submitCode(element, out, langselect, inputcheckbox, custominput) {
  const code = element.getValue();
  const checkbox = inputcheckbox.val();
  const input = custominput.val();
  const lang = langselect.val();
  check = "";
  if(checkbox == 'on') {
    check = 'Yes';
  }
  else {
    check = 'No';
  }

  $.post('/compilecode', {
    'code' : code,
    'input' : input,
    'inputRadio' : check,
    'lang' : lang
  }).done((output) => {
    // TODO: format and display the output as needed
    console.log(out);
    out.html(output);
    console.log(output);
  });
}
