function submitCode() {
  const code = $('#code').val();
  const inputRadioVal = $('input[name=inputRadio]:checked').val();
  const input = $('#input').val();
  const lang = $('#lan').val();

  $.post('/compilecode', {
    'code' : code,
    'input' : input,
    'inputRadio' : inputRadioVal,
    'lang' : lang
  }).done((output) => {
    // TODO: format and display the output as needed
    console.log(output);
  });
}
