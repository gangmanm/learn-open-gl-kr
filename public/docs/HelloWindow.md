# Hello Window 

GLFW를 실행해 봅시다. 먼저, .cpp 파일을 하나 만들고, 새로 만든 파일의 맨 위에 다음 #include 구문들을 추가하세요.

```cpp
#include <glad/glad.h>
#include <GLFW/glfw3.h>
```

@error[GLAD를 GLFW보다 먼저 포함해야 한다는 점을 꼭 기억하세요. GLAD의 헤더 파일은 내부적으로 필요한 OpenGL 헤더(예: GL/gl.h)을 포함하고 있으므로, OpenGL이 필요한 다른 헤더 파일들(예: GLFW)보다 먼저 GLAD를 포함해야 합니다.]

다음으로는 main 함수를 생성해야 합니다. 이 함수 안에서 GLFW 창을 생성하게 됩니다:

```cpp
int main()
{
    glfwInit();
    glfwWindowHint(GLFW_CONTEXT_VERSION_MAJOR, 3);
    glfwWindowHint(GLFW_CONTEXT_VERSION_MINOR, 3);
    glfwWindowHint(GLFW_OPENGL_PROFILE, GLFW_OPENGL_CORE_PROFILE);
    //glfwWindowHint(GLFW_OPENGL_FORWARD_COMPAT, GL_TRUE);
  
    return 0;
}
```
메인 함수에서 처음으로 GLFW를 @function[{"name": "glfwInit", "description": "GLFW 라이브러리를 초기화합니다. 대부분의 GLFW 함수들이 사용되기전에 GLFW가 초기화 되어야 합니다.", "tags" : "GLFW"}] 초기화가 완료되면,

@function[{"name":"glfwWindowHint","parameters":[{"name":"target","type":"int","description":"변경하려는 설정 항목을 지정합니다.GLFW_로 시작하는 열거형 상수를 사용합니다."},{"name":"hint","type":"int","description":"지정한 옵션(target)에 대해 설정할 값입니다."}],"description":"glfwWindowHint 함수는 이후 호출될 glfwCreateWindow 함수에 적용할 설정값을 지정합니다.이 설정값들은 재설정되기 전까지 유지됩니다.다양한 창 속성(OpenGL 버전,리사이즈 가능 여부 등)을 미리 설정하는 데 사용됩니다.","example":"glfwWindowHint(GLFW_CONTEXT_VERSION_MAJOR,3);\\nglfwWindowHint(GLFW_CONTEXT_VERSION_MINOR,3);\\nglfwWindowHint(GLFW_RESIZABLE,GL_FALSE);","tags":"GLFW"}]  

함수를 사용하여 GLFW 설정을 구성할 수 있습니다. `glfwWindowHint` 의 첫 번째 인자는 설정하려는 옵션을 지정합니다.
`GLFW_` 로 시작하는 다양한 열거형(enum) 값들 중에서 선택할 수 있습니다. 두 번째 인자는 해당 옵션에 설정할 정수값 입니다.
사용 가능한 모든 옵션과 그에 해당하는 값들은 [GLFW의 윈도우 처리 문서에서](https://www.glfw.org/docs/latest/window.html#window_hints) 확인할 수 있습니다.
만약 지금 애플리케이션을 실행했을 때 undefined reference(정의되지 않은 참조) 오류가 많이 발생한다면, 이는 GLFW 라이브러리를 제대로 링크하지 않았다는 뜻입니다

이 책의 초점은 OpenGL 3.3 버전에 맞춰졌기 때문에, GLFW 3.3이 우리가 사용할 버전임을 알려주어야 합니다. 이렇게 하면 GLFW는 OpenGL 컨텍스트를 생성할 때 적절한 준비를 하게 됩니다. 이를 통해 사용자는 해당 OpenGL 버전이 없을 경우 실행되지 않도록 보장할 수 있습니다. Major과 Minor 을 모두 3으로 설정합니다. 우리는 또한 GLFW에게 `core-profile`을 사용한다고 알려주어야 합니다. GLFW에 코어 프로파일(Core Profile)을 사용하겠다고 설정하면, 더 이상 필요하지 않은 이전 버전과의 호환 기능을 제외한, 보다 작고 현대적인 OpenGL 기능 집합만 사용할 수 있게 됩니다. 

@note[Mac OS X에서는 다음 코드를 초기화 시 반드시 추가해야 정상적으로 동작합니다]

```cpp
glfwWindowHint(GLFW_OPENGL_FORWARD_COMPAT, GL_TRUE); 
```


@info[시스템이나 하드웨어에 OpenGL 3.3 이상 버전이 설치되어 있는지 반드시 확인하세요. 그렇지 않으면 애플리케이션이 충돌 할 수 있습니다. Linux에서는 glxinfo 명령어를 사용하거나, Windows에서는 OpenGL Extension Viewer와 같은 유틸리티를 사용해 현재 시스템의 OpenGL 버전을 확인할 수 있습니다. 만약 지원되는 OpenGL 버전이 3.3보다 낮다면, 그래픽 카드가 OpenGL 3.3 이상을 지원하는지 확인해보세요 (지원하지 않는다면 상당히 오래된 그래픽 카드일 가능성이 큽니다).또한, 그래픽 카드 드라이버를 최신 버전으로 업데이트해 보는 것도 좋습니다.]

다음으로는 우리는 window object를 생성해야합니다. 이 윈도우 객체는 모든 창 관련 데이터를 포함하며, GLFW의 대부분의 다른 함수에서 필수적으로 사용됩니다.

```cpp

GLFWwindow* window = glfwCreateWindow(800, 600, "LearnOpenGL", NULL, NULL);
if (window == NULL)
{
    std::cout << "Failed to create GLFW window" << std::endl;
    glfwTerminate();
    return -1;
}
glfwMakeContextCurrent(window);
```

@function[{"name":"glfwCreateWindow","parameters":[{"name":"width","type":"int","description":"윈도우의 원하는 가로 크기(스크린 좌표 단위)입니다."},{"name":"height","type":"int","description":"윈도우의 원하는 세로 크기(스크린 좌표 단위)입니다."},{"name":"title","type":"const char*","description":"초기 윈도우 제목입니다."},{"name":"monitor","type":"GLFWmonitor*","description":"전체 화면 모드에서 사용할 모니터입니다. 창 모드를 사용하려면 NULL을 지정합니다."},{"name":"share","type":"GLFWwindow*","description":"리소스를 공유할 다른 윈도우의 컨텍스트입니다. 공유하지 않으려면 NULL을 사용합니다."}],"description":"이 함수는 윈도우와 그에 연결된 OpenGL 컨텍스트를 생성합니다. 윈도우의 동작 방식을 제어하는 대부분의 설정은 glfwWindowHint를 통해 사전에 설정해야 합니다. 윈도우를 성공적으로 생성하더라도, 현재 활성화된 컨텍스트는 바뀌지 않습니다. 새로 생성된 컨텍스트를 사용하려면 반드시 glfwMakeContextCurrent를 호출해 해당 컨텍스트를 활성화해야 합니다.","example":"GLFWwindow* window;\n window = glfwCreateWindow(800, 600, \\\"LearnOpenGL\\\", nullptr, nullptr);","tags":"GLFW"}]


이 함수는 첫 번째와 두 번째 인자로 각각 윈도우의 가로(width)와 세로(height) 크기를 필요로 합니다.
세 번째 인자는 윈도우의 이름(제목)을 설정하는 데 사용되며, 여기서는 "LearnOpenGL"로 설정했지만 원하는 이름으로 지정할 수 있습니다. 마지막 두 개의 인자는 지금은 무시해도 괜찮습니다. 이 함수는 나중에 다른 GLFW 작업에 필요하게 될 GLFWwindow 객체를 반환합니다. 그 다음에는, 우리가 생성한 윈도우의 OpenGL 컨텍스트를 현재 스레드의 주 컨텍스트로 설정하기 위해 GLFW에 알려야 합니다. 그 다음에는, GLFW에 현재 스레드에서 사용할 주요 컨텍스트(main context)로 우리가 생성한 윈도우의 컨텍스트를 설정하라고 지정합니다. 

@function[{"name":"glfwMakeContextCurrent","parameters":[{"name":"window","type":"GLFWwindow*","description":"현재 스레드에서 활성화할 OpenGL 컨텍스트를 가진 GLFW 윈도우입니다."}],"description":"이 함수는 지정된 윈도우의 OpenGL 컨텍스트를 호출한 스레드에서 현재 컨텍스트로 설정합니다. 하나의 컨텍스트는 동시에 하나의 스레드에서만 활성화될 수 있으며, 각 스레드는 동시에 하나의 컨텍스트만을 가질 수 있습니다.","example":"glfwMakeContextCurrent(window);","tags":"GLFW"}]

@info[OpenGL은 어떤 창에 그릴지를 몰라서 glfwMakeContextCurrent()를 통해 명시해줘야 한다. 그때그때 그릴 창(window)을 활성화해줘야만 OpenGL 명령이 해당 창에 제대로 적용된다.]

```cpp

GLFWwindow* window1 = glfwCreateWindow(800, 600, "Window 1", NULL, NULL);
GLFWwindow* window2 = glfwCreateWindow(800, 600, "Window 2", NULL, NULL);

glfwMakeContextCurrent(window1); // 이제부터 OpenGL 명령은 window1에 적용됨
// OpenGL draw code...

glfwMakeContextCurrent(window2); // 이제부터 OpenGL 명령은 window2에 적용됨
// OpenGL draw code...

```

## GLAD
이전장에서 우리는 GLAD가 OpenGL을 위한 함수 포인터를 관리한다고 언급했습니다. 따라서 OpenGL 함수를 부르기 전에 GLAD를
초기화 해야합니다. 

```cpp

if (!gladLoadGLLoader((GLADloadproc)glfwGetProcAddress))
{
    std::cout << "Failed to initialize GLAD" << std::endl;
    return -1;
}    

```

우리는 GLAD에게 OpenGL 함수 포인터들의 주소를 불러오는 함수를 전달해야 합니다. 이 함수는 운영체제마다 다르게 정의되어 있습니다.
GLFW는 이를 위해 `glfwGetProcAddress`라는 함수를 제공하며, 이 함수는 컴파일 중인 운영체제에 맞는 적절한 함수를 자동으로 정의해 줍니다


## Viewport

렌더링을 시작하기 전에 마지막으로 해야 할 일이 하나 있습니다. 바로 OpenGL에게 렌더링할 창의 크기를 알려주는 것입니다. 그래야 OpenGL이 데이터를 어떻게 창에 맞춰 표시할지를 알 수 있기 때문입니다. 이 크기는 glViewport 함수를 사용하여 설정할 수 있습니다.

@function[
{
"name": "glViewport",
"parameters": [
{
"name": "x",
"type": "GLint",
"description": "뷰포트 사각형의 왼쪽 x좌표입니다. 윈도우 내 위치를 픽셀 기준으로 설정합니다."
},
{
"name": "y",
"type": "GLint",
"description": "뷰포트 사각형의 아래쪽 y좌표입니다. OpenGL에서는 y=0이 윈도우의 하단을 의미합니다."
},
{
"name": "width",
"type": "GLsizei",
"description": "뷰포트의 가로 너비를 지정합니다."
},
{
"name": "height",
"type": "GLsizei",
"description": "뷰포트의 세로 높이를 지정합니다."
}
],
"description": "이 함수는 OpenGL 렌더링을 위한 실제 **윈도우 내 렌더링 영역(뷰포트)**을 설정합니다. 뷰포트는 정규화 장치 좌표(-1 ~ 1 범위)를 윈도우 좌표로 매핑하는 기준이 됩니다. 지정된 좌표를 통해 OpenGL이 데이터를 창 내 어느 영역에 표시할지 결정합니다.",
"example": "glViewport(0, 0, 800, 600);",
"tags": "Initalization"
}
]


```cpp

glViewport(0, 0, 800, 600);

```
`glViewport`의 첫 두개 매개변수는 창의 왼쪽 아래 모서리의 위치를 설정합니다. 세 번째와 네 번째 매개변수는 너비와 높이를 픽셀 단위로 설정합니다. 일반적으로 이는 GLFW 창의 크기와 동일하게 설정합니다.

실제로는 뷰포트 크기를 GLFW 창의 크기보다 더 작게 설정할 수도 있습니다. 이 경우, 모든 OpenGL 렌더링 결과는 더 작은 영역에 표시되고, 남은 영역에 다른 요소들을 표시할 수도 있습니다.

@info[내부적으로 OpenGL은 glViewport를 통해 지정된 데이터를 사용하여, 처리된 2D 좌표를 화면상의 좌표로 변환합니다.예를 들어, 처리된 한 점의 위치가 (-0.5, 0.5)라면, 최종적으로는 화면 좌표상 (200, 450)으로 매핑될 수 있습니다 OpenGL에서 처리되는 좌표는 기본적으로 -1에서 1 사이의 값을 가지므로, 우리는 (-1 ~ 1) 범위의 좌표를 (0 ~ 800)과 (0 ~ 600) 범위의 화면 좌표로 매핑하게 되는 것입니다.]


```cpp
void framebuffer_size_callback(GLFWwindow* window, int width, int height);  
```

그러나 사용자가 창 크기를 조절하는 순간, 뷰포트도 함께 조정되어야 합니다.
이를 위해 창이 리사이즈될 때마다 자동으로 호출되는 콜백 함수를 등록할 수 있습니다. 이 리사이즈 콜백 함수는 다음과 같은 형식(프로토타입)을 가집니다.인자를 채워넣어 사용자가 이용할 수 있도록 합니다. 

```cpp

void framebuffer_size_callback(GLFWwindow* window, int width, int height)
{
    glViewport(0, 0, width, height);
}  

```
그리고 GLFW 에게 우리가 이 함수를 창이 리사이즈 될때마다 호출되도록 하고싶다고 알려주어야 합니다. 

```cpp
glfwSetFramebufferSizeCallback(window, framebuffer_size_callback);  
```

창이 처음 표시될 때에도 `framebuffer_size_callback` 함수는 호출되며,
이때 전달되는 인자는 최종적인 창의 너비와 높이입니다.
Retina 디스플레이와 같은 고해상도 화면에서는 이 값들이 초기 입력값보다 훨씬 더 크게 나올 수 있습니다.

OpenGL에서는 다양한 콜백 함수를 설정하여 사용자 정의 동작을 등록할 수 있습니다.
예를 들어, 조이스틱 입력 변경, 오류 메시지 처리 등을 위한 콜백 함수를 만들 수 있습니다.
이러한 콜백 함수들은 창을 생성한 이후, 그리고 렌더링 루프가 시작되기 전에 등록해야 합니다.


## Ready your engines

우리는 어플리케이션이 단일 이미지를 보여준 후 곧바로 종료되길 원하지 않습니다. 애플리케이션이 종료되라고 명령을 받기 전까지 지속적으로 이미지를 보여주고 사용자의 입력을 받아야 합니다. 이 이유 때문에 우리는 `while loop`를 만들어야 합니다. 
이것을 `render loop`라고 부를 것입니다. GLFW에게 우리가 말하기 전까지는 계속 작동하라고 하는 것입니다. 다음 코드는 
간단한 render loop에 대한 예시 입니다. 


```cpp
while(!glfwWindowShouldClose(window))
{
    glfwSwapBuffers(window);
    glfwPollEvents();    
}
```

@function[
{
  "name": "glfwWindowShouldClose",
  "parameters": [
    {
      "name": "window",
      "type": "GLFWwindow*",
      "description": "종료 여부를 확인할 GLFW 윈도우 객체입니다."
    }
  ],
  "description": "이 함수는 지정된 윈도우가 종료 요청을 받았는지를 확인합니다. 종료 요청이 있다면 GL_TRUE를 반환하고, 그렇지 않다면 계속해서 GL_FALSE를 반환합니다. 일반적으로 렌더링 루프를 유지할지 여부를 결정하는 조건문에 사용됩니다.",
  "example": "while (!glfwWindowShouldClose(window)) {\n    // 이벤트 처리\n    // 렌더링\n    // 버퍼 교환\n}",
  "tags": "GLFW"
}
]

glfwWindowShouldClose 함수는 렌더 루프의 각 반복이 시작될 때, GLFW가 창을 닫으라는 지시를 받았는지 확인합니다.
만약 닫으라는 지시가 있었다면 이 함수는 true를 반환하고, 렌더 루프는 종료되며 그 후 애플리케이션을 종료할 수 있게 됩니다.

@function[
{
  "name": "glfwPollEvents",
  "description": "이 함수는 현재까지 수신된 모든 이벤트(예: 키보드 입력, 마우스 움직임 등)를 처리한 뒤 즉시 반환됩니다. 이벤트를 처리하면, 해당 이벤트에 등록된 창 및 입력 콜백 함수들이 호출됩니다.",
  "example": "glfwPollEvents();",
  "tags": "GLFW"
}
]
함수는 키보드 입력이나 마우스 움직임과 같은 이벤트가 발생했는지 확인하고, 윈도우 상태를 업데이트한 후,
우리가 등록한 콜백 함수들을 호출합니다.
@function[
{
  "name": "glfwSwapBuffers",
  "description": "이 함수는 지정된 윈도우의 프론트 버퍼(front buffer)와 백 버퍼(back buffer)를 서로 교체(swap)합니다. 일반적으로 OpenGL은 더블 버퍼링(double buffering)을 사용하여 화면 깜빡임을 방지합니다. 백 버퍼에서 렌더링을 수행한 후, 이 함수를 호출하여 백 버퍼를 프론트 버퍼로 전환하면 사용자에게 완성된 이미지를 한 번에 보여줄 수 있어 렌더링 중간 단계가 노출되는 문제를 방지할 수 있습니다.",
  "example": "glfwSwapBuffers(window);",
  "tags": "GLFW"
}
]
함수는 이번 렌더링 루프 동안 사용된 컬러 버퍼(픽셀마다 색상 정보를 담고 있는 2차원 버퍼)를 화면에 출력용으로 전환합니다.
즉, 백 버퍼와 프론트 버퍼를 교체하여 렌더링 결과를 화면에 표시하게 됩니다.

### Double Buffer란
@info[만약 애플리케이션이 단일 버퍼에서 그려지게 된다면 image의 모습이 깜박거릴 수 있습니다. 이는 출력 이미지가 한순간에 그려지는 것이 아니라, 보통 픽셀 단위로 왼쪽에서 오른쪽, 위에서 아래로 차례차례 그려지기 때문입니다. 이처럼 렌더링이 아직 진행 중인 상태에서 이미지가 사용자에게 표시되면, 중간 렌더링 상태(아티팩트)가 화면에 노출될 수 있습니다.이러한 문제를 해결하기 위해 윈도우 기반 애플리케이션은 더블 버퍼(double buffer)를 사용합니다. 프론트 버퍼(front buffer)는 화면에 보여지는 최종 이미지를 담고 있으며, 모든 렌더링 명령은 백 버퍼(back buffer)에 수행됩니다. 렌더링 명령이 모두 완료되면, 백 버퍼와 프론트 버퍼를 교체(swap)하여 완전히 렌더링이 끝난 이미지만 사용자에게 표시되도록 함으로써, 위에서 말한 아티팩트 문제를 제거할 수 있습니다.]

## One last thing

렌더 루프에서 빠져나오면, GLFW에서 할당된 모든 리소스를 적절히 정리 및 삭제해 주는 것이 좋습니다.
이를 위해 main 함수의 마지막에 @function[
{
  "name": "glfwTerminate",
  "description": "이 함수는 남아 있는 모든 윈도우를 제거하고, GLFW에서 할당한 모든 리소스를 해제하며, 라이브러리를 초기화되지 않은 상태로 되돌립니다. 이 함수가 호출된 이후에는 다시 GLFW 기능을 사용하려면 glfwInit을 성공적으로 다시 호출해야 합니다.\n\n보통 렌더링 루프(또는 게임 루프)가 종료된 후, 리소스를 정리하고 애플리케이션을 종료하기 위해 호출하는 것이 좋은 관례입니다.",
  "example": "glfwTerminate();",
  "tags": "GLFW"
}
] 함수를 호출하여 리소스를 정리할 수 있습니다.



```cpp
glfwTerminate();
return 0;
```

이것은 애플리케이션의 모든 리소스를 적절히 정리할 것입니다. 이제 애플리케이션을 컴파일 해보세요, 모든 게 잘 작동한다면 다음과 같은 결과를 볼 수 있습니다. 

![hellowwindow](./images/getting-started/hellowindow.png)


만약 화면에 아주 칙칙하고 지루한 검은 화면이 나왔다면, 제대로 작업한 것입니다!
반면에 화면이 이상하게 보이거나, 전체 흐름이 헷갈린다면, [전체 소스 코드](https://learnopengl.com/code_viewer_gh.php?code=src/1.getting_started/1.1.hello_window/hello_window.cpp)를 확인해보세요.
(만약 화면이 다양한 색으로 깜빡이고 있다면, 계속해서 읽어보세요.)

애플리케이션이 컴파일되지 않는 문제가 있다면,
먼저 링커 설정이 제대로 되었는지,
그리고 IDE에 올바른 디렉토리들이 추가되었는지 확인하세요 (이전 챕터에서 설명한 대로).

또한 작성한 코드가 올바른지 다시 점검하고, 전체 소스 코드와 비교해보면서 확인해보는 것이 좋습니다.

## Input