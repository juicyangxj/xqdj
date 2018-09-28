JuicyMobile-移动web的前端组件化开发框架
====
The newest version 1.0.0 by yangxiaojun 2018-8-21.
====

## 概述
前端摩尔定律：“每18-24个月，前端难度会增加一倍”。正是前端飞速的发展使得前端看似简单，但若想深入却实属不易。
前端模块化（功能模块比如btn），组件化（页面的一部分 如header/footer），可维护化为前提。
利用组件化开发，拆分功能，封装组件，单独维护，降低系统各个功能的耦合性，并且提高了功能内部的聚合性。
一杯沙子的美在于其亲密无间，而一杯石头的美则是实而不满。设计粒度的选择不会仅仅在一杯沙子和一杯石头做一个二元选择，更多的选项可能会是沙中夹杂着石头或者石中混合着沙子，因此粒度的把握就更加地复杂和微妙。

## 更新内容

## 开发说明
适用于微信项目，和原生app交互h5页面,特色其实是利用table，f-width* 任意拼凑，类似栅格布局

## 目录说明
1. scss文件夹

每个Scss目录下的文件夹都对应着各种分类的_xxx.scss文件：
	base：放置基本样式、辅助功能性SCSS文件，比如重置样式_reset.scss，模板样式_mixin.scss、可变因素_variables.scss、_function.scss、_css3.scss等
	components：放置一些公用组件，比如：按钮_buttons.scss、表单_form.scss、表格_table.scss、选项卡_tabs.scss等
	layout：放置一些跟页面布局相关的，比如：_layout.scss、_header.scss、_footer.scss等
	pages:放置跟具体项目页面相关的样式文件。
	themes：对于一些需换肤的项目，就可以将相关文件放置在这里。
	vendors：引用的外部插件或者框架的SCSS文件，比如_bootstrap.scss。
	main.scss这是主样式文件，最终编译，就编译这个文件。
	
## 环境配置说明
1.工具-预编辑设置- 选择scss编辑两个参数  C:\Ruby24-x64\bin\scss.bat  --no-cache %FileName%  ../css/%FileBaseName%.css --style compact
2.在ruby的安装目录下找到engine.rb文件，目录格在文件中添加一行Encoding.default_external = Encoding.find('utf-8')
3.在scss文件的头部加一行@charset "utf-8"
4.嵌套输出 nested默认、展开输出 expanded、紧凑输出 compact、压缩输出 compressed

但是自动编译会把所有的scss都找出来编译，这个项目我只要盯住main.scss,所以通过cmd ,
注意，此项目的路径不能有中文
sass --watch scss/main.scss:css/main.css --style compressed

还有上传图片，上传视频，图片预览，还有不同角色点进去的逻辑关系没做