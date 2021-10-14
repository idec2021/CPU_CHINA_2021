// 菜单页
var header = new Vue({
    el: "#header",
    data: {
        loading: true,
        menu: "./data/Menu/T--CPU_CHINA--face.png", //菜单按钮
        isOpen: false, //背景变化
        classA: false, //一级菜单是否打开
        classB: false, //二级菜单是否打开
        isActive: "", //背景变色
        isActiveA: -1, //一级菜单悬停效果
        isActiveB: -1, //二级菜单悬停效果
        status: // 菜单的状态
        {
            "open": "./data/Menu/T--CPU_CHINA--cancel.png",
            "close": "./data/Menu/T--CPU_CHINA--face.png"
        },
        clickon: true, //鼠标是否位于菜单上
        ifon: true, //离开是否会关闭按钮
        // 一级菜单列表
        classList: ["Project", "Method", "Result", "Safety", "Team" ,"Data and Records"],
        // 二级菜单刘表
        classList2: [
            [{
                    text: "Background",
                    url: "./Background.html",
                    num: 0,
                },
                {
                    text: "Description",
                    url: "./Description.html",
                    num: 1,
                },
                {
                    text: "Design",
                    url: "./Design.html",
                    num: 2,
                }
            ],
            [{
                    text: "Dry Lab",
                    url: "./MethodDryLab.html",
                    num: 0,
                },
                {
                    text: "Wet Lab",
                    url: "./MethodWetLab.html",
                    num: 1,
                }
            ],
            [{
                    text: "Summary",
                    url: "./ResultSummary.html",
                    num: 0,
                },
                {
                    text: "Dry Lab",
                    url: "./ResultDryLab.html",
                    num: 1,
                },
                {
                    text: "Wet Lab",
                    url: "./ResultWetLab.html",
                    num: 2,
                },
            ],
            [{
                    text: "Safety",
                    url: "./Safety.html",
                    num: 0,
                }
            ],
            [{
                    text: "Members",
                    url: "./Members.html",
                    num: 0,
                }
            ],
            [{
                text: "Experiment Records",
                    url: "./ExperimentRecords.html",
                    num: 0,
            },
            {
                text: "Data and Computing Codes",
                    url: "./DataComputingCodes.html",
                    num: 1,
            },
            {
                text: "Data Accessibility Statements",
                    url: "./DataAccessibilityStatements.html",
                    num: 2,
            }
            ]
        ],
    },
    methods: {
        // 鼠标悬停到菜单按钮上
        mouseover() {
            if (this.menu == this.status["close"]) {
                this.menu = "./data/Menu/T--CPU_CHINA--zheng.gif";
                this.isOpen = true;
                this.isActive = "menu";
                setTimeout(() => {
                    this.classA = true;
                    this.menu = "./data/Menu/T--CPU_CHINA--cancel.png";
                }, 1100);
            }
        },
        // 关闭菜单
        close() {
            if (this.menu == this.status["open"]) {
                this.menu = "./data/Menu/T--CPU_CHINA--fan.gif";
                this.isActive = "";
                this.classB = false;
                this.classA = false;
                this.isActiveA = -1;
                setTimeout(() => {
                    this.isOpen = false;
                    this.menu = "./data/Menu/T--CPU_CHINA--face.png";
                    this.loading = false;
                }, 1100);
            }
        },
        // 点击菜单按钮
        click() {
            if (this.menu == this.status["open"]) {
                this.close();
            } else if (this.menu == this.status["close"]) {
                this.mouseover();
            } else {
                return;
            }
        },
        // 鼠标移动到菜单上
        on() {
            this.clickon = false;
            this.ifon = false;
        },
        // 鼠标离开菜单
        leave() {
            setTimeout(() => {
                if (this.clickon) {
                    this.ifon = true;
                    if (this.ifon && this.menu == this.status["open"]) {
                        this.close();
                    } else {
                        return;
                    }
                }
            }, 3000);
            this.clickon = true;
        },
        // 鼠标点击空白关闭菜单
        ifclick() {
            if (this.clickon && this.menu == this.status["open"]) {
                this.close();
            } else {
                return;
            }
        },
        // 鼠标点击一级菜单
        classAClick(index) {
            this.isActiveB = -1;
            this.isActiveA = index;
            this.classB = true;
        },
        // 鼠标悬停到二级菜单
        classBOver(num) {
            setTimeout(() => {
                this.isActiveB = num;
            }, 300);
        },
        // 鼠标离开二级菜单
        classBLeave(num) {
            setTimeout(() => {
                this.isActiveB = -1;
            }, 300);
        },
    },
    mounted() {
        this.$nextTick(function () {
            this.mouseover();
            setTimeout(() => {
                this.close();
            }, 1100)
        })
    }
});


// 页面滚动响应
var $navs = $("nav li"), // 导航
    $sections = $(".section"), // 模块
    $window = $(window),
    navLength = $navs.length - 1;

$window.scroll(function () {
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    len = navLength;
    for (; len > -1; len--) {
        var that = $sections.eq(len);
        if (scrollTop+10 >= that.offset().top) {
            $navs.removeClass("current").eq(len).addClass("current");
            break;
        }
    }
});

$navs.on("click", function (e) {
    e.preventDefault();
    $("html, body").animate({
            scrollTop: $($(this).find("a").attr("href")).offset().top,
        },
        400
    );
});
