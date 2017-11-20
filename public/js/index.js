function submitCode(element,out, langselect) {
  const code = element.getValue();
  const inputRadioVal = $('input[name=inputRadio]:checked').val();
  const input = $('#input').val();
  const lang = langselect.value;;

  $.post('/compilecode', {
    'code' : code,
    'input' : 'No',
    'inputRadio' : 'No',
    'lang' : lang
  }).done((output) => {
    // TODO: format and display the output as needed
    console.log(out);
    out.html(output);
    console.log(output);
  });
}
