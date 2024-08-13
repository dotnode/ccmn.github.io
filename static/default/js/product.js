/*--------------------------------------------------

--------------------------------------------------*/
function changeTab(obj,id){
    obj.parent("ul").children("li").removeClass("active");
    obj.addClass("active");
    $("#tabProduct").attr("style","display:none");
    $("#tabContact").attr("style","display:none");
    $("#tabMessage").attr("style","display:none");
    $("#"+id).attr("style","display:block");
}
function lookUpContact(){
    $("#tabProduct").attr("style","display:none");
    $("#tabMessage").attr("style","display:none");
    $("#tabContact").attr("style","display:block");
    $("#titleTable li").removeClass("active");
    $("#titleTable .li2").addClass("active");
}
function selectPic(obj){
    $("#pics1").removeClass("active");
    $("#pics2").removeClass("active");
    $("#pics3").removeClass("active");
    $("#pics4").removeClass("active");
    $("#pics5").removeClass("active");
    obj.addClass("active");
    $("#proImg").attr("src",obj.children("img").attr("src"));
    $("#proImg").parent("a").attr("href",obj.children("img").attr("src"));
}
function check() {
    var length = $('#content').val().length;
    if (length > 501) {
        alert('留言内容超过500字，无法提交！');
        return false;
    } else if (!$("#content").val() || !$("#verify").val()) {
        alert('带*号为必填内容');
        return;
    } else {
        $.ajax({
            type: "POST",
            url: $('#evaluation').attr('data-action'),
            data: $("#evaluation").serialize(),
            success: function(message) {
                if ("ActiveXObject" in window) {
                    window.location.reload();
                    alert(message.info);
                } else {
                    if (message.s == 1) {
                        $("#content").val('');
                        $("#verify").val('');
                        $("#qq").val('');
                    }
                    reflush();
                    $('#myModal').modal('hide').remove();
                    $('.modal-backdrop').remove();
                    var html = '<div id="myModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">';
                    html += '<div class="modal-dialog">';
                    html += '<div class="modal-content">';
                    html += '<div class="modal-header">';
                    html += '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>';
                    html += '<h3 id="myModalLabel" id="myModalLabel">提示信息</h3>';
                    html += '</div>';
                    html += '<div class="modal-body">';
                    html += '<p>' + message.info + '</p>';
                    html += '</div>';
                    html += '<div class="modal-footer">';
                    html += '<button class="btn" onclick="guanbi()" data-dismiss="modal">关闭</button>';
                    html += '</div>';
                    html += '</div></div></div>';
                    $('body').append(html);
                    $('#myModal').modal('show');
                }
            },
            error: function(data) {
                alert('提交失败');
            }
        });
    }
}
function guanbi(){
    window.location.reload();
}
function reflush() {
    document.getElementById('verify_img').src = "/Public/verify_c?" + Math.random();
}

function checkInquiryMobile(obj){
    if(obj.val()==''||isNaN(obj.val())){
        return false;
    }
    $.ajax({
        type: "POST",
        url: '/Common/checkInquiryMobile',
        data: 'mobile='+obj.val(),
        async:true,
        success: function(data) {
            if(data.s==1){
                $("#is_changed").val(1);
                $("#getCode").hide();
                $("#waitCode").hide();
                $("#verifyCode").hide();
                $("#verifyCode input").attr("ignore","ignore");
            }else{
                $("#is_changed").val(0);
                $("#getCode").show();
                $("#waitCode").hide();
                $("#verifyCode").show();
                $("#verifyCode input").removeAttr("ignore");
            }
        }
    });
}

function getInquiryMobileCode(mobile,second){
    if(mobile==''||mobile.length!=11||isNaN(mobile)!=false){
        return false;
    }
    if(second<=1){
        $("#wait").html(59);
        $("#getCode").show();
        $("#waitCode").hide();
        return true;
    }
    if(second >= 60){
        $.ajax({
            type: "POST",
            url: '/Common/sendMobileCode',
            data: 'mobile='+mobile,
            async:true,
            success: function(data) {
                $.hideValidMsg();
            }
        });
        $("#getCode").hide();
        $("#waitCode").show();
    }
    second--;
    $("#wait").html(second);
    setTimeout(function() {
    getInquiryMobileCode(mobile,second)
    },1000);
}
$(function(){
    var url = window.location.href;
    url = url.replace(".html", "");
    if (url.indexOf("?p") !== -1) {
        $("#titleTable .li3").trigger("click");
    }
    $("#Inquiry,[name='Inquiry']").click(function(){
        $.ajax({
            type: "POST",
            url: '/Common/checkLogin',
            async:true,
            success: function(data) {
                if(data.s==-1){
                    $("#popBox input[name='contact']").val('');
                    $("#popBox input[name='mobile']").val('');
                    $("#popBox #getCode").show();
                    $("#popBox input[name='code']").removeAttr("ignore");
                    $("#popBox #verifyCode").show();
                }
            }
        });
        $("#popBox").show();
    });
    $("#closeInquiry").click(function(){
        $("#popBox").hide();
    });
    $("#productInquiryForm").Validform({
        tiptype: 3, 
        ajaxPost: true,
        showAllError:false,
        postonce:true,
        callback: function(data) {
            if(data.status==1){
                $("#productInquiryForm").Validform().resetForm();
                if(data.changed == 0){
                    $("#getCode").show();
                    $("#waitCode").hide();
                }
                $("#popBox").hide();
                $('#Black_bg').hide();
                $.hideValidMsg();
            }else{
                $.hideValidMsg();
            }
        }
    });
})