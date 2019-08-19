/**
 *  validate form
 */

function validateForm(formId){
    let $form = $('#'+ formId);
    let common = {
        errorClass: 'text-danger',
        errorElement: 'em',
    }
    let config = {};
    switch(formId){
        case 'addStudentForm':
            config = {
                submitHandler: function(form){
                    let data = $(form).serialize();
                    $.post('/stu/update/add', data, function(result, status){
                        alert('添加成功');
                        form.reset();
                    });
                }
            }
            break;
        default: 
            return; 
    }
    let validateConfig = Object.assign(common, config);
    return $form.validate(validateConfig);
}

