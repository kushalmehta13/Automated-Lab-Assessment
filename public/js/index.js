function submitCode(element,out) {
  const code = element.getValue();
  const inputRadioVal = $('input[name=inputRadio]:checked').val();
  const input = $('#input').val();
  const lang = $('#lan').val();

  $.post('/compilecode', {
    'code' : code,
    'input' : 'No',
    'inputRadio' : 'No',
    'lang' : 'C'
  }).done((output) => {
    // TODO: format and display the output as needed
    console.log(out);
    out.html(output);
    console.log(output);
  });
}
