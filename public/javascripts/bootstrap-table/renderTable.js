/**
 *  render bootstrap table
 */

function renderTable(tableId, params){
    let $table = $('#' + tableId);
    let common = {
        classes: 'table table-hover table-bordered table-striped text-nowrap',
        toolbar: '#toolbar',
        // cache: false,
        pageNumber: 1,
        pageSize: 10,
        pageList: '[10, 20, 50, 100, ALL]',
        pagination: true,
        paginationLoopz: true,
        showColumns: true,
        showExport: true,
        showRefresh: true,
        // showToggle: true,
        paginationSwitch: true,
        showPaginationSwitch: true,
        // cardView: true,
        search: true,
        idField: 'id',
        // searchAlign: 'left',
        sortName: 'id',
        sortOrder: 'desc',
        // detailView: true,
        // detailFormatter: function (value, row , index) {
        //      return '<b>备注：</b>' + row.t_bz;
        // },
    };
    let config = {};
    switch (tableId) {
        case 'studentTable':
            config = {
                url: '/stu/data/list',
                columns: [{
                    field: 'id',
                    title: '',
                    align: 'center',
                    valign: 'middle',
                    visible: false
                }, {
                    field: '',
                    title: '#',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (value, row, index) {
                        return index + 1;
                    }
                }, {
                    field: 'name',
                    title: '姓名',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'gender',
                    title: '性别',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'class',
                    title: '班级',
                    align: 'center',
                    valign: 'middle',
                    formatter: function(value, row, index){
                        return row.grade + '-' + row.class_;
                    }
                }, {
                    field: 'address',
                    title: '住址',
                    // align: 'center',
                    valign: 'middle',
                },{
                    field: 'enter_date',
                    title: '入学时间',
                    align: 'center',
                    valign: 'middle',
                    visible: false
                },{
                    field: 'state',
                    title: '状态',
                    align: 'center',
                    valign: 'middle',
                    formatter: function(value, row, index){
                        if(value === 0){
                            return '在校';
                        }else{
                            return '离校';
                        }
                    }
                }, {
                    field: 'operator',
                    title: '操作',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (value, row, index) {
                        return '<a class="btn btn-danger btn-xs" title="删除">' +
                            '<i class="fa fa-trash"> 删除</i></a>';
                    },
                    events: {
                        'click a[title=删除]': function (e, value, row, index) {
                            let id = row.id;
                            if (confirm('确定删除？')) {
                                $.ajax({
                                    url: '/stu/update/del',
                                    method: 'POST',
                                    data: {
                                        id: id,
                                    },
                                    success: function (result) {
                                        $table.bootstrapTable('refresh');
                                    }
                                });
                            }
                        }
                    }
                }]
            }
            break;
        default:
            return;
    }
    let tableConfig = Object.assign(common, config);
    return $table.bootstrapTable(tableConfig);
}
