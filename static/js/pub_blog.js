window.onload = function () {
    console.log('页面加载完成，开始初始化编辑器...');
    
    const {createEditor, createToolbar} = window.wangEditor

    const editorConfig = {
        placeholder: '请输入博客内容...',
        onChange(editor) {
            const html = editor.getHtml()
            console.log('编辑器内容更新', html)
        },
    }

    const editor = createEditor({
        selector: '#editor-container',
        html: '<p><br></p>',
        config: editorConfig,
    })

    const toolbarConfig = {
        toolbarKeys: [
            'headerSelect',
            'bold',
            'italic',
            'underline',
            'through',
            'color',
            'bgColor',
            'clearStyle',
            'bulletedList',
            'numberedList',
            'todo',
            'justifyLeft',
            'justifyRight',
            'justifyCenter',
            'insertLink',
            'insertImage',
            'insertTable',
            'codeBlock',
            'blockquote',
            'divider'
        ]
    }

    const {toolbar} = createToolbar({
        editor,
        selector: '#toolbar-container',
        config: toolbarConfig,
    })

    console.log('编辑器初始化完成');

    $("#submit-btn").click(function(event){
        console.log('点击发布按钮');
        event.preventDefault();

        let title = $("input[name='title']").val();
        let category = $("#category-select").val();
        let content = editor.getHtml();
        let csrfmiddlewaretoken = $("input[name='csrfmiddlewaretoken']").val();
        
        console.log('提交数据:', {
            title: title,
            category: category,
            content: content.substring(0, 50) + '...'
        });

        $.ajax('/blog/pub', {
            method: 'POST',
            data: {title, category, content, csrfmiddlewaretoken},
            success: function(result){
                console.log('服务器响应:', result);
                if(result['code'] == 200){
                    let blog_id = result['data']['blog_id']
                    window.location = '/blog/detail/' + blog_id
                }else{
                    alert(result['message']);
                }
            },
            error: function(xhr, status, error){
                console.error('请求失败:', error);
                console.error('响应内容:', xhr.responseText);
                alert('发布失败，请重试');
            }
        });
    });
}