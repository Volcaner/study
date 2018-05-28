<template>
	<div class="content">
         <span class="baom_xq">报名详情</span>
         <ul class="xq_list">
             <li>
                 <span class="leftspan">推广公众号:</span>
                 <div class="divright">
                   <select class="slelect_xl" v-model="selected" v-if="!select_show">
                     <option v-for="val in option" :value='val.userName'>{{val.nickName}}</option>
                   </select>
                   <div class="go_link" v-if="select_show"><i class="tipIcon"></i><span class="go_spantext">您尚未绑定公众号，请</span><a :href="gzh_href" class="go_alink">前往绑定</a></div> 
                 </div>
             </li>
             <li>
                 <span class="leftspan">推广标签:</span>
                 <div class="divright">
                     <p class="p">请选择6-12个标签，用于推广页展示</p>
                     <dl class="dl_bq">
                         <dd v-for="(v,index) in bq" @click="dd(index)">{{v.tag_name}}</dd>
                     </dl>
                     <div class="selectbq">
                         <dl class="dl_selectbq">
                             <dd v-for="v in tg">{{v.tag_name}}<i class="icon iconfont" @click='removedd(v.atag_id)'>&#xe606;</i></dd>
                         </dl>
                     </div>
                 </div>
             </li>
             <li>
                 <span class="leftspan">推广图:</span>
                 <div class="divright">
                     <p class="p">用于推广页呈现，宽度290px，高度160px</p>
                     <div class="tudiv">
                         <div class="divimg">
                              <div class="addimg">
                                   <span>+</span>
                                   <input type="file" class="addfile"/>
                              </div>
                         </div>
                         <div class="warpdiv" style="display:none;">
                              <div class="btnfile">
                              <div class="btn btn_th">
                                  <i class="icon iconfont">&#xe61d;</i>
                                  <span>替换</span>
                                  <input type="file" class="addfile"/>
                              </div>
                              <div class="btn btn_remove">
                                  <i class="icon iconfont">&#xe905;</i>
                                  <span>删除</span>
                              </div>
                         </div>
                         </div>
                     </div>
                 </div>
             </li>
             <li>
                 <span class="leftspan">仓储地址:</span>
                 <div class="divright">
                        <p class="p">用于推广页地址搜索</p>
                        <div class="dz_update" v-if="!ccdz_show">
                            <p>{{dz}}</p>
                            <!--<a :href="ccdz_href">修改</a>-->
                        </div>
                        <div class="go_link" v-if="ccdz_show"><i class="tipIcon"></i><span class="go_spantext">您尚未填写仓储地址，请</span><a :href="ccdz_href" class="go_alink">前往填写</a></div>
                 </div>
             </li>
             <li>
                 <span class="leftspan">封顶推广金额:</span>
                 <div class="divright">
                     <div class="tg_money">
                         <input type="text" class="fd_money"/>
                         <span>元（不能低于预缴推广费，当高于预缴推广费时，平台将在消费完预缴推广费后，从现金账户扣款，此为总封顶推广金额。）</span>
                     </div>
                     <div class="yjtgf">
                         <p>预缴推广费</p>
                         <div>{{advance_charge}}<span>元</span></div>
                     </div>
                     <label class="label">
                         <input type="checkbox" v-model="check"/>
                         <span @click="lookProtocol">公众号推广协议</span>
                     </label>
                     <div class="bot_over">
                       <input type="button" value="报名并缴费" class="sub" :class='{ disb: isActive }' @click="sub"/>
                       <div class="div_tips" v-if="show"><tips :ts="ts" :ts_text="text"></tips></div>
                     </div>
                     
                 </div>
             </li>
         </ul>
         <dl class="tkRule" v-if="protocolShow">
			<dt></dt>
			<dd>
				<div class="tkr_title"><span>公众号推广服务协议</span><span class="tkr_close" @click="closeProtocol">×</span></div>
				<div class="tkr_con">
					<p>各条款前所列索引关键词及标题仅为帮助您理解该条款表达的主旨之用，不影响或限制本协议条款的含义或解释。为维护您自身权益，建议您仔细阅读各条款具体表述。</p>
					<p>【审慎阅读】您在勾选确认本协议之前，应当认真阅读本协议。请您务必审慎阅读、充分理解各条款内容，特别是免除或限制责任、法律适用和争议解决等以粗体下划线格式特别标识的条款，您应重点阅读。如您对本协议有任何疑问，可向蚁巢客服咨询。</p>
					<p>【签约使用】当您在勾选确认本协议之时，即表示您已充分阅读、理解并接受本协议的全部内容，并与蚁巢达成一致。本协议自您勾选确认本协议之时起或使用蚁巢公众号推广服务的行为发生之时起（以时间在先者为准）生效。如果您不同意本协议或其中任何条款约定，您应立即停止使用公众号推广服务。</p>
					<h3>一、定义：</h3>
					<p>公众号推广服务：指蚁巢通过公众号推广向用户提供的软件服务，该软件服务可依用户操作、使用户指定信息并根据一定规则对信息进行动态收集、处理、存储、检索和计算，并取得计算结果。</p>
					<p>蚁巢：指杭州新共秀网络科技有限公司。</p>
					<p>位置资源：指蚁巢网站（www.ant188.com）</p>
					<p>预缴推广费：指仓储用户使用公众号推广服务过程中，就使用蚁巢提供的软件服务时，需按约定向蚁巢支付的费用。</p>
					<p>指定信息：指仓储用户通过蚁巢公众号推广服务输入的含有文字、图片和链接内容等的信息。</p>
					<p>手机数：指用户在蚁巢提供的网站上通过扫码关注获取的手机号，24小时取消关注的公众号不记入统计。手机数的统计以蚁巢的统计结果为准。</p>
					
					<h3>二、协议范围</h3>
					<h4>2.1 签约主体</h4>
					<p>【平等主体】本协议由您与蚁巢共同缔结，本协议对您和蚁巢均具有合同效力。</p>
					<p>【主体信息】</p>
					<span>•	本协议内的蚁巢，即蚁巢公众号推广服务提供者，特指杭州新共秀网络科技有限公司。</span>
					<span>•	蚁巢公众号推广服务提供者可能不是公众号推广服务所在网站的网站经营者，亦可能不是蚁巢公众号推广服务系统的著作权人，但这并不影响本协议的效力和您本协议项下的权益。您可随时查看相关网站首页底部公示的证照信息以确定网站经营者。</span>
					<span>•	蚁巢公众号推广服务系统提供者可能会因为业务调整等发生变更，变更后的各项服务提供者与您共同履行本协议并向您提供服务，服务提供者的变更不会影响您本协议项下的权益。</span>
					<h4>2.2 补充协议</h4>
					<p>由于互联网高速发展，您与蚁巢签署的本协议列明的条款并不能完整罗列并覆盖您与蚁巢之间的所有权利与义务，现有的约定也不能保证完全符合未来发展的需求。</p>
					<h3>三、账户开通与使用</h3>
					<h4>3.1 信息管理</h4>
					<p>【信息真实】使用蚁巢公众号推广服务时，您应当准确完整地提供您的信息（包括您的姓名、公司名称及电子邮件地址、联系电话、联系地址等）。如有变更，应及时提供最新、真实、完整的信息，以便蚁巢或其他用户与您联系。您了解并同意，您有义务保持您提供信息的真实性及有效性。如蚁巢按您最后一次提供的信息与您联系未果、您未按蚁巢的要求及时提供信息、您提供的信息存在明显不实的，蚁巢将按规则进行处理，您应承担因此对您自身、他人及蚁巢造成的全部损失与不利后果。</p>
					<h4>3.2账户安全规范</h4>
					<p>【账户安全保管义务】您的账户为您自行设置并由您保管，蚁巢在任何时候均不会主动要求您提供您的账户。因此，建议您务必保管好您的账户，并确保您在每个上网时段结束时退出登录并以正确步骤离开软件系统。</p>
					<p>账户因您主动泄露或遭受他人攻击、诈骗等行为导致的损失及后果，均由您自行承担。</p>
					<p>【账户行为责任自负】除蚁巢存在过错外，您应对您账户项下的所有行为结果（包括但不限于在线签署各类协议、使用各项功能进行推广等）负责。</p>
					<p>【日常维护须知】如发现任何未经授权使用您账户登录软件系统或其他可能导致您账户遭窃、遗失的情况，建议您立即通知蚁巢，并授权蚁巢将该信息同步给其关联公司。您理解蚁巢对您的任何请求采取行动均需要合理时间，除蚁巢存在过错外，蚁巢对在采取行动前已经产生的后果不承担任何责任。</p>
					<h4>3.3账户权限</h4>
					<p>【蚁巢会员账户】如您通过蚁巢会员账户使用蚁巢公众号推广软件服务，当您的蚁巢会员账户处于暂时或永久无法使用时，则您将同时无法使用蚁巢公众号推广软件服务，直至您的蚁巢会员账户可继续正常使用。</p>
					<h3>四、蚁巢公众号推广软件服务及规范</h3>
					<h4>4.1 服务内容 </h4>
					<p>【功能特别说明】 您理解并同意：</p>
					<span>（a）鉴于位置资源方相关要求、投放效果等因素，不同用户指定信息的展示位置、展现形式等可能会存在差异。同时，软件系统也可能会根据位置资源方要求等自动检索和调整指定信息展示位置和页面、页面规格和形式等，您对如上所有调整或修改提前作出认可。同时您同意，蚁巢没有义务向您披露所有软件服务类型及其详细内容等相关信息。</span>
					<span>（b）蚁巢有权根据法律法规规定、产品政策或软件功能等要求您修改或拒绝您提交的关键词和指定信息。</span>
					<span>（c）网民点击指定信息（无论指定信息是否包含有用户商标等信息）后，可能直接单独跳转至您的指定信息或指定链接页面，也可能由系统根据规则自动先跳转至包含并尽量突出您的指定信息的指定信息集合页面，该页面内展示的其他用户指定信息由系统自动确定。</span>
					<h4>4.2 推广行为规范</h4>
					<p>【合法性】您在此声明并保证，在使用蚁巢公众号推广软件服务过程中实施的所有行为（包括但不限于选定关键词、上传指定信息等，下同）以及其后的所有行为，包括但不限于商品销售或服务的提供等等，均遵守国家法律、法规、行政规章等规范性文件，本协议的规定和要求。您自行对您指定信息和（或）选定的关键词及相关内容、商品、服务等以及对通过蚁巢公众号推广软件服务进行的其他商务活动所引起的一切法律纠纷承担全部责任。您同时保证，蚁巢联盟网站不会因您使用蚁巢公众号推广软件服务而构成违法、违约或者对任何第三人的侵权。</p>
					<p>【诚信经营】您承诺，您将恪守诚信经营原则，一旦出现下述任一情形，可认定为您对本协议及诚信经营原则的违反：</p>
					<span>（a）违反本协议第四条第3款【委托充值】条款约定，拒不退还您已经消耗且您的蚁巢公众号账户余额不足以退还部分的款项；</span>
					<span>（b）涉嫌利用蚁巢公众号软件服务实施欺诈或其他任何违法行为（蚁巢有权单方对此作出认定）；</span>
					<span>（c）被任何第三方投诉、举报，包括但不限于投诉您有收款不发货、所发货物与约定严重不符等恶意或违约行为，或投诉您有销售假冒伪劣产品或侵犯第三方合法权利等的行为；</span>
					<span>（d）未经蚁巢书面同意，擅自许可他人使用蚁巢公众号推广软件服务或擅自将蚁巢公众号推广软件服务转让或部分转让他人；</span>
					<span>（e）利用蚁巢公众号推广软件服务或计算机病毒/程序等手段，非法窃取、删除、修改或增加蚁巢网站其他会员的任何信息，或以其他任何方式危害蚁巢网站的正常运行；</span>
					<span>（f）恶意使用蚁巢公众号推广软件服务，使用装置、软件或例行程序等干预或试图干预蚁巢公众号推广软件，或在蚁巢公众号推广软件系统内恶意竞价或对其他用户指定信息进行恶意点击等；</span>
					<span>（g）以不良方法或技术等规避本协议的要求</span>
					<p>【不承诺效果】蚁巢公众号推广用户对使用蚁巢公众号软件服务的效果应有合理预估，蚁巢及其关联公司不对您使用蚁巢公众号推广软件服务后的访问量、商品销量、经营业绩、投资收益等作任何明示或暗示的承诺。与软件预测数据相关的（包括信赖这些预测行事而产生的）任何后果、责任、风险由您自行承担。</p>
					<p>【保密义务】用户因同意或履行本协议，或因使用蚁巢公众号推广服务而获得的有关蚁巢或其关联公司的任何信息，包括但不限于有关技术、财务、市场、管理等方面的科学、商业、数据或内部信息，均为蚁巢及其关联公司的保密信息，应为蚁巢及其关联公司的专有财产。您在此承诺对蚁巢及其关联公司的保密信息严格保密，除用于使用蚁巢公众号推广服务之目的，不得使用或允许他人使用，亦不得向任何第三方披露。本款下的保密义务不因蚁巢公众号推广服务的中止或终止而终止。</p>
					<h4>4.3 费用与结算</h4>
					<p>【预付费用】除非您与蚁巢另有书面约定，所有费用必须预付，即预存入您的蚁巢公众号推广账户。用户可通过直接对其蚁巢公众号推广账户充值或授权委托第三方对其指定的蚁巢公众号推广账户充值进行预存（以下亦称“充值”）。</p>
					<p>【资金合法】您承诺并保证用于其蚁巢公众号推广账户充值的资金来源的合法性，否则蚁巢有权配合司法机关的要求，对您的蚁巢公众号推广账户进行相应处理，包括但不限于冻结您的蚁巢公众号账户等。</p>
					<p>【统计数据】您同意，指定信息的手机数等相关数据以蚁巢的统计数据为准。</p>
					<p>【退款】用户应充分预估需求并确定充值金额，不得随意申请退款。如您确有客观原因需暂停或终止使用蚁巢公众号推广服务并退款，您承诺严格按照蚁巢的要求及流程操作。您理解并同意，除您自行或委托他人或蚁巢充值的部分，其他如赠款、红包及同类非现金折扣等均不得申请退款，即退款时该部分对应的金额只可保持在蚁巢公众号推广账户内或由蚁巢收回。</p>
					<h4>4.4 责任限制</h4>
					<p>【不可抗力】蚁巢将按“现状”和按“可得到”的状态向您提供蚁巢公众号推广服务。蚁巢依法律规定承担基础保障义务，但无法对由于信息网络设备维护、连接故障，电脑、通讯或其他系统的故障，电力故障，罢工，暴乱，火灾，洪水，风暴，爆炸，战争，政府行为，司法行政机关的命令或因第三方原因而给您造成的损害结果承担责任。</p>
					<p>【责任限制】您了解并同意，下列情形下，蚁巢不承担任何责任：</p>
					<span>（a）并非由于蚁巢的故意或过失而导致淘宝直通车软件服务未能提供或发生故障；</span>
					<span>（b）由于用户的故意或过失导致用户及/或任何第三方遭受损失的；</span>
					<span>（c）在用户指定信息、关键词或用户商誉有任何瑕疵或争议（包括但不限于蚁巢有合理理由怀疑或第三方投诉等），或双方就上述瑕疵或争议无法达成一致时，蚁巢单方删除用户指定信息、中止和（或）终止向用户提供蚁巢公众号推广软件服务，且不予退还用户蚁巢公众号推广账户内的余额。</span>
					<span>（d）用户违反本协议或规则，或违反与蚁巢或新共秀公司的其它协议、合同及/或约定，或者违反蚁巢网站规则，被相应处罚的。</span>
					<h3>五、用户信息的保护及授权</h3>
					<h4>5.1 个人信息的保护</h4>
					<p>蚁巢非常重视用户个人信息（即能够独立或与其他信息结合后识别用户身份的信息）的保护，在您使用公众号推广软件服务时，您同意蚁巢按照在蚁巢网站公布的隐私权政策收集、存储、使用、披露和保护您的个人信息。</p>
					<h4>5.2 非个人信息授权</h4>
					<p>【授权使用】对于您在注册、激活账户或其他使用淘宝直通车软件服务过程中提供、形成的除个人信息外的文字、图片、视频、音频等非个人信息，您免费且长期有效的授予蚁巢及其关联公司获得全球的许可使用权利及再授权给其他第三方使用的权利。您同意蚁巢及其关联公司存储、复制、分析、使用、修订、编辑、发布、展示、翻译、分发您的非个人信息并可以制作其派生信息或作品，并以已知或日后开发的形式、媒体或技术将上述信息纳入其它服务或作品内。</p>
					<p>为方便您使用蚁巢及其关联公司提供的其他相关服务，您授权蚁巢将您在注册、激活账户或其他使用蚁巢服务过程中提供、形成的信息传递给其他相关服务提供者，或从其他相关服务提供者处获取您在注册、使用相关服务期间提供、形成的信息。</p>
					<h3>六、用户的违约及处理</h3>
					<h4>6.1 违约认定</h4>
					<p>发生如下情形之一的，视为您违约：</p>
					<span>•	使用蚁巢公众号推广软件服务时违反相关法律法规规定的；</span>
					<span>•	使用蚁巢公众号推广软件服务引起相关国家主管机关的审查或质询的；</span>
					<span>•	违反本协议或本协议补充协议约定的。</span>
					<h4>6.2 违约处理措施</h4>
					<p>【信息处理】您使用蚁巢公众号推广软件服务发布的指定信息构成违约的，蚁巢可依据本协议相关规则拒绝您发布指定信息或立即部分/全部删除您的指定信息。</p>
					<p>【行为限制】您使用公众号推广软件服务的行为构成违约的，蚁巢可依据相关规则对您及您的关联账户执行累计处罚、中止或终止合作等处理措施。</p>
					<p>【蚁巢账户处理】蚁巢可能会依照您违约行为的风险程度指示新共秀公司对您的蚁巢账户采取资金划扣、止付、解除止付等措施。</p>
					<p>【处理结果公示】蚁巢可将对您的违约行为处理措施信息，以及其他经国家行政或司法机关生效法律文书确认的违法信息在软件系统内或蚁巢相关网站上予以公示。</p>
					<h4>6.3 赔偿责任</h4>
					<p>如您的行为使蚁巢或其关联公司遭受损失（包括自身的直接经济损失、商誉损失及对外支付的赔偿金、和解款、律师费、诉讼费等间接经济损失），您应赔偿蚁巢或其关联公司的上述全部损失。</p>
					<p>如您的行为使蚁巢或其关联公司遭受第三方主张权利，蚁巢或其关联公司可在对第三人承担金钱给付等义务后就全部损失向您追偿。</p>
					<p>如蚁巢认定您的行为已经或者将必然导致第三方遭受损失，蚁巢或其关联公司出于第三方权益保护目的，可自您的蚁巢公众号推广账户余额内扣减，或指示新共秀公司自您的蚁巢账户中划扣相应款项进行支付。如仍不足支付相应款项的，您同意委托蚁巢使用自有资金代您支付上述款项，您应当返还该部分费用并赔偿因此造成蚁巢的全部损失。</p>
					<p>对于您造成蚁巢或其关联公司、第三方的所有损失(包括蚁巢或其关联公司垫付款在内的上述所有情形)，您同意蚁巢可自您的蚁巢公众号推广账户余额内扣减，或指示新共秀公司自您的蚁巢账户中划扣。如仍不足支付的，蚁巢或其关联公司可直接抵减您在蚁巢或其关联公司其它协议项下的权益，并可继续追偿。</p>
					<h4>6.4 特别约定</h4>
					<p>【商业贿赂】如您向阿里妈妈及/或其关联公司的雇员或顾问等提供实物、现金、现金等价物、劳务、旅游等价值明显超出正常商务洽谈范畴的利益，则可视为您存在商业贿赂行为。发生上述情形的，蚁巢可立即终止与您的所有合作并向您收取违约金及/或赔偿金，该等金额以阿里妈妈因您的贿赂行为而遭受的经济损失和商誉损失作为计算依据。</p>
					<p>【关联处理】如您因违约导致蚁巢终止本协议时，出于维护合作秩序的目的，蚁巢或其关联公司可对您在其他协议项下的合作采取中止甚至终止协议的措施，并以本协议约定方式通知您。</p>
					<p>如蚁巢或其关联公司与您签署的其他协议中明确约定了对您在本协议项下合作进行关联处理的情形，则蚁巢出于维护合作秩序的目的，可在收到指令时中止甚至终止本协议，并以本协议约定方式通知您。</p>
					<h3>七、协议的变更</h3>
					<p>蚁巢可根据国家法律法规变化及维护合作秩序需要，不时修改本协议、补充协议，变更后的协议、补充协议（下称“变更事项”）将按本协议约定方式通知您。</p>
					<p>如您不同意变更事项，您有权于变更事项确定的生效日前联系蚁巢反馈意见。如反馈意见得以采纳，蚁巢将酌情调整变更事项。</p>
					<p>如您对已生效的变更事项仍不同意的，您应当于变更事项确定的生效之日起停止使用蚁巢服务，变更事项对您不产生效力；如您在变更事项生效后仍继续使用蚁巢服务的，则视为您同意已生效的变更事项。</p>
					<h3>八、通知</h3>
					<span>•	公示的文案；</span>
					<span>•	站内信、客户端推送消息；</span>
					<span>•	根据您预留于蚁巢软件系统里的联系方式发出的电子邮件、短信、函件等。</span>
					<h3>九、协议的终止</h3>
					<h4>9.1 终止的情形</h4>
					<p>【用户发起的终止】您有权通过以下任一方式终止本协议:</p>
					<span>•	变更事项生效前您停止使用公众号推广服务，并明示不愿接受变更事项的；</span>
					<span>•	您明示不愿继续使用蚁巢公众号推广服务的。</span>
					<p>【蚁巢发起的终止】出现以下情况的，蚁巢可以本协议约定方式通知您终止本协议：</p>
					<span>•	您的账户为不活跃账户，被蚁巢依据本协议约定终止合作的；</span>
					<span>•	您在与蚁巢或其关联公司进行其他合作时，有侵犯他人合法权益或其他严重违法违约行为的；</span>
					<span>•	您违反本协议其他约定，蚁巢依据本协议约定终止合作的；</span>
					<span>•	其它应当终止服务的情况。</span>
					<p>本协议终止的，您不能再继续使用软件系统的各项功能。反之，当蚁巢通知您永久关闭公众号推广账户或终止您使用公众号推广软件服务时，本协议同时终止，蚁巢将不再另行通知您终止本协议。</p>
					<h4>9.2 终止后的处理</h4>
					<p>【用户信息披露】本协议终止后，除法律有明确规定外，蚁巢无义务向您或您指定的第三方披露您账户中的任何信息。</p>
					<p>【蚁巢权利】本协议终止后，蚁巢仍享有下列权利：</p>
					<span>•	继续保存您留存于软件系统的本协议第五条所列的各类信息；</span>
					<span>•	对于您过往的违约行为，蚁巢仍可依据本协议向您追究违约责任。</span>
					<h3>十、法律适用、管辖与其他</h3>
					<p>【法律适用】本协议之订立、生效、解释、修订、补充、终止、执行与争议解决均适用中华人民共和国大陆地区法律；如法律无相关规定的，参照商业惯例及/或行业惯例。</p>
					<p>【管辖】您因使用蚁巢公众号推广服务及因本协议所产生的任何争议，由蚁巢与您协商解决。协调不成时，任何一方均可向被告所在地有管辖权的人民法院提起诉讼。</p>
					<p>【可分性】本协议任一条款被视为废止、无效或不可执行，该条应视为可分的且并不影响本协议其余条款的有效性及可执行性。</p>
					<p>【国民经济行业分类】本协议约定软件服务属于软件开发/信息系统集成/数据处理和存储服务行业。</p>
					<h4 class="beizhu">注：该协议的解释权在法律规定的范围内归杭州新共秀网络科技有限公司所有</h4>
					
				</div>
				<div class="tkr_botm"><input type="button" value="同意并继续" @click="agree"></div>
			</dd>
		</dl>
	</div>
</template>
<script>
import { mapState,mapMutations,mapActions } from 'vuex';
import tips from '../component/tips.vue';
export default{
 props:['json2'],
 data(){
		return{
		  advance_charge:'',
		  option:'',
		  bq:'',//标签
		  tg:'',//选择的标签
		  selected:'',//推广公众号
		  fd_money:'',//封顶推广金额
		  id:'',
		  dz:'',
		  check:false,
		  src:'',
		  isActive:true,
		  show:false,
		  ts:'',
		  text:'',
		  select_show:false,
		  ccdz_show:false,
		  gzh_href:'/yich/Storage/Storage_accounts_manage.html?page=7',
		  ccdz_href:'',
		}
	},
	computed:{
		...mapState(['protocolShow']),
	},
	methods:{
	 lookProtocol:function(){
		 this.$store.state.protocolShow = true;
	 },
     closeProtocol:function(){
    	this.$store.state.protocolShow = false; 
     },
     agree:function(){
    	 this.$store.state.protocolShow = false;
    	 this.check =true;
     },
	 dd:function(index){
	   var atag_id = (this.bq)[index].atag_id;
	   var tag_name = (this.bq)[index].tag_name;
	    var idarr=[];
	   for(var g=0;g<this.tg.length;g++){
	      idarr.push((this.tg)[g].atag_id);
	   }
	   if(idarr.indexOf(atag_id)==-1){
	   var json={};
	   json.atag_id=atag_id;
	   json.tag_name=tag_name;
	     (this.tg).push(json);
	   }
	 },
	 removedd:function(id){
	   for(var i=0;i<this.tg.length;i++){
	      if((this.tg)[i].id==id){
	        (this.tg).splice(i,1);
	        break;
	      }
	   }
	 },
	 sub:function(){
	 this.show=false;
	 if(!this.check){
	   this.show=true;
	   this.ts="warning";
	   this.text="请先看协议";
	   return false;
	 }
	   if($(".imgid").length==0 || $.trim($(".imgid").text())!='100%'){
	     this.show=true;
	     this.ts="warning";
	     this.text="请先把图片上传完成";
	     return false
	    }else{
	    this.src=$(".loadpic").val();
	   }
	   this.fd_money=$.trim($(".fd_money").val());
	   if(this.fd_money==''){
	     this.show=true;
	     this.ts="warning";
	     this.text="请先填写完整";
	     return false
	   }
	   if(this.fd_money*1<this.advance_charge*1){
	     this.show=true;
	     this.ts="warning";
	     this.text="不能低于预缴推广费";
	     return false
	   }
	    if(this.tg.length<6 || this.tg.length>12){
	         this.show=true;
		     this.ts="warning";
		     this.text="请选择6-12个标签";
		     return false
	   }
	   var obj={};
	   obj.user_name=this.selected;//推广公众号Id
	   if(this.tg.length>0){
	   var idarr=[];
	   for(var b=0;b<this.tg.length;b++){
	      idarr.push((this.tg)[b].atag_id);
	   }
	     obj.tag=idarr.join(";");//标签
	   }else{
	     obj.tag='';//标签
	   }
	   obj.src=this.src;//推广图
	   obj.top_price=this.fd_money;//封顶金额
	   obj.advertisement_id=this.id;//id
	   obj.factoryAddress=(this.dz).split(" ").join(";");//地址
	    this.$http.post('/yich/AdvertisementPayServlet',obj,{emulateJSON:true}).then((response) => {
		 		  window.checkErrorVue(response);
		 		  console.log(response.data);
		 		  if(!response.data.flag){
		 		         this.show=true;
					     this.ts="warning";
					     this.text="报名失败";
					    // window.location.href=response.data.url;
		 		  }else{
		 		  var payNum=response.data.payNum;
		 		  var totalFee=response.data.totalFee;
		 		    window.location.href="/yich/Storage/Storage_zhifupage.html?payNum="+payNum+"&totalFee="+totalFee;
		 		  }
	    			  }, (response) => {
	    			   console.log('error');
	    		 });
	   
	   
	   
	   
	 },
	},
	watch:{
	  check:function(newval,oldval){
	    if(newval){
	      this.isActive=false;
	    }else{
	      this.isActive=true;
	    }
	  },
	  json2:function(newval,oldval){
	     console.log(33333);
	     console.log(newval);
	     this.advance_charge=newval.advance_charge;
	     this.option=newval.option;
	     this.bq=newval.bq;
	     this.tg=newval.tg;
	     this.dz=(newval.dz).split(";").join(" ");
	     if((newval.option).length>0 && typeof (newval.option)[0].userName!='undefined'){
	     this.selected=(newval.option)[0].userName;
	     }
	     this.id=newval.advertisement_id;
	     if(this.option.length==0){
	       this.select_show=true;
	     }else{
	       this.select_show=false;
	     }
	     if(this.dz==''){
	       this.ccdz_show=true;
	     }else{
	       this.ccdz_show=false;
	     }
	     this.ccdz_href='/yich/Storage/Storage_data.html?supShopId='+newval.supId;
	  },
	},
	components:{
	  "tips":tips,
	},
}

</script>
<style type="text/css" lang="less">
@import '../../css/public.less';
.go_link{
    width:220px;
    height:24px;
    line-height:24px;
    background:#ffffe5;
    border:solid 1px #fed18b;
    padding-left:10px;
    margin-bottom:6px;
    .tipIcon{
        display: block;
        float:left;
        width: 11px;
        height: 14px;
        background: url(../../images/popularizeTips.png);
        margin-top:5px;
    }
    .go_spantext{
        font-size:12px;
        color:#777777;
        display:block;
        float:left;
        margin:0 8px;
    }
    .go_alink{
        display:block;
        float:left;
        font-size:12px;
        color:#005aff;
    }
}
  .content{
      padding:10px 20px;
      background:#ffffff;
  }
  .baom_xq{
      font-size:14px;
      color:#000000;
      font-weight:bold;
      display:block;
      line-height:14px;
  }
  .xq_list{
      margin:20px 0;
      line-height:30px;
      li{
          overflow:hidden;
          .leftspan{
              display:block;
              float:left;
              font-size:12px;
              color:#212121;
              width:96px;
          }
          .divright{
              float:left;
              .slelect_xl{
                  display:block;
                  width:246px;
                  height:28px;
                  border:solid 1px #d2d2d2;
              }
              .p{
                  font-size:12px;
                  color:#777777;
              }
              .dl_bq{
                  padding:8px;
                  width:844px;
                  border:solid 1px #dedede;
                  overflow:hidden;
                  margin-bottom:10px;
                  dd{
                      float:left;
                      height:24px;
                      line-height:24px;
                      padding:0 8px;
                      margin:5px 3px;
                      font-size:12px;
                      color:#777777;
                      border:dashed 1px #777777;
                      cursor:pointer;
                  }
              }
              .selectbq{
                  border:dashed 1px #777777;
                  padding:8px;
                  width:844px;
                  .dl_selectbq{
                      padding:10px 0;
                      overflow:hidden;
                      dd{
                          float:left;
                          padding:0 8px;
                          height:24px;
                          line-height:24px;
                          background:#e68484;
                          text-align:center;
                          font-size:12px;
                          color:#ffffff;
                          margin:10px 5px;
                          position: relative;
                          i.iconfont{
                              position: absolute;
                              right:-6px;
                              top:-10px;
                              font-size:16px;
                              color:#000000;
                              cursor:pointer;
                          }
                      }
                  }
              }
              .tudiv .divimg{
                  position: absolute;
                  left:0;
                  top:0;
                  width:100%;
                  height:100%;
              }
              .tudiv{
                  width:288px;
                  height:158px;
                  border:solid 1px #777777;
                  position: relative;
                  .warpdiv{
                      position: absolute;
                      left:0;
                      top:0;
                      width:100%;
                      height:100%;
                      z-index:5;
                  }
                  .addimg{
                      background:#d0d0d0;
                      width:100%;
                      height:100%;
                      font-size:24px;
                      text-align:center;
                      line-height:158px;
                      color:#777777;
                      position: absolute;
                      input{
                          position: absolute;
                          width:100%;
                          height:100%;
                          left:0;
                          top:0;
                          z-index:3;
                          filter:alpha(opacity=0);  
                          -moz-opacity:0;  
                          -khtml-opacity: 0;  
                          opacity: 0;  
                      }
                      span{
                          position: absolute;
                          left:0;
                          top:0;
                          width:100%;
                          height:100%;
                          font-size:20px;
                          color:#999999;
                          text-align:center;
                      }
                  }
                  .btnfile{
                      width:76px;
                      height:76px;
                      position: absolute;
                      left:50%;
                      top:50%;
                      margin-top:-38px;
                      margin-left:-38px;
                      .btn{
                          width:74px;
                          height:28px;
                          border:solid 1px #999999;
                          .Gradient(#fefeff,#e3e3e4);
                          font-size:16px;
                          i.iconfont{
                              display:block;
                              float:left;
                              font-size:18px;
                              margin:0 8px;
                              color:#777777;
                          }
                          span{
                              display:block;
                              font-size:14px;
                              color:#212121;
                          }
                      }
                      .btn_th{
                          margin-bottom:16px;
                          position:relative;
                          input{
                            position:absolute;
                            width:100%;
                            height:100%;
                            left:0;
                            top:0;
                            filter:alpha(opacity=0);   
						    -moz-opacity:0;   
						    -khtml-opacity: 0;   
						    opacity: 0;   
                          }
                      }
                  }
              }
              .tg_money{
                  overflow:hidden;
                  line-height:30px;
                  margin-bottom:10px;
                  input{
                      display:block;
                      float:left;
                      width:98px;
                      height:28px;
                      border:solid 1px #d2d2d2;
                  }
                  span{
                      display:block;
                      float:left;
                      font-size:12px;
                      color:#777777;
                      margin-left:6px;
                  }
              }
              .yjtgf{
                  width:850px;
                  padding:10px 0 10px 10px;
                  background:#ffecec;
                  border:solid 1px #ffc7c7;
                  p{
                      font-size:14px;
                      color:#212121;
                  }
                  div{
                      font-size:24px;
                      color:#ff0000;
                      font-weight:bold;
                      margin-top:10px;
                      span{
                          font-size:12px;
                          color:#777777;
                      }
                  }
              }
              .label{
                  display:block;
                  overflow:hidden;
                  input{
                      display:block;
                      width:12px;
                      height:12px;
                      float: left;
                      margin-right:4px;
                      margin-top:9px;
                  }
                  span{
                      font-size:12px;
                      color:#777777;
                      display:block;
                      float:left;
                      cursor:pointer;
                  }
              }
              .bot_over{
               overflow:hidden;
               .div_tips{
                  float:left;
                  width:160px;
                  margin-left:5px;
               }
               .sub{
                  display:block;
                  float:left;
                  border:none;
                  width:88px;
                  height:30px;
                  color:#ffffff;
                  font-size:12px;
                  .Gradient(#ff5959,#ff3334);
	              }
	              .sub.disb{
	                background:#999999;
	              }
              }
          }
      }
  }
    .dz_update{
      overflow:hidden;
      p{
          color:#777777;
          font-size:12px;
          float:left;
      }
      a{
          display:block;
          float:left;
          margin-left:6px;
          font-size:12px;
          color:#005aff;
      }
}
.tkRule>dt {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 9;
    box-sizing: border-box;
}
.tkRule>dd {
    position: fixed;
    width: 900px;
    height: 500px;
    top: 50%;
    left: 50%;
    margin-top: -250px;
    margin-left: -450px;
    border: solid 4px #c4c4c4;
    background: #ffffff;
    z-index: 10;
    box-sizing: border-box;
}
.tkr_title {
    height: 36px;
    line-height: 36px;
    background: #f3f3f3;
    overflow: hidden;
    box-sizing: border-box;
}
.tkr_title>span:first-child {
    margin-left: 10px;
    font-size: 12px;
    color: #000000;
    font-weight: bold;
    box-sizing: border-box;
}
.tkr_title>span:last-child {
    float: right;
    margin-right: 15px;
    font-size: 24px;
    cursor: pointer;
    color: #000000;
    box-sizing: border-box;
}
.tkr_con {
    height: 400px;
    overflow-y: auto;
    padding: 0 12px;
    padding-bottom: 12px;
    box-sizing: border-box;
}
.tkr_botm {
    height: 56px;
    line-height: 56px;
    text-align: center;
    background: #f3f3f3;
    box-sizing: border-box;
}
.tkr_botm>input {
    cursor: pointer;
    width: 300px;
    height: 36px;
    color: #fff;
    font-size: 14px;
    background: #ee2222;
    border: 0;
    vertical-align: inherit;
    box-sizing: border-box;
}
.tkRule h4 {
    margin-top: 12px;
    color: #000;
    box-sizing: border-box;
}
.tkr_con>p {
    font-size: inherit;
    margin-bottom: inherit;
    line-height: 24px;
    box-sizing: border-box;
}
.tkr_con>span {
    padding-left: 7px;
    display: block;
    line-height:20px;
    box-sizing: border-box;
}
</style>