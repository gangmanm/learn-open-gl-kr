// OpenGL 함수 데이터베이스
export interface OpenGLFunction {
  name: string;
  params: Array<{
    name: string;
    type: string;
    description: string;
  }>;
  description: string;
  example: string;
  tags: string[];
}

export const openglFunctions: Record<string, OpenGLFunction> = {
  glGenTextures: {
    name: "glGenTextures",
    params: [
      {
        name: "n",
        type: "GLsizei",
        description: "생성할 텍스처 객체의 개수를 지정합니다."
      },
      {
        name: "textures",
        type: "GLuint*",
        description: "생성된 텍스처 ID들이 저장될 배열의 포인터입니다."
      }
    ],
    description: "주어진 개수만큼의 텍스처 객체를 생성하고 해당 텍스처들의 ID를 배열에 저장합니다. 개발자는 이 텍스처 객체들을 사용해 텍스처를 생성하거나 활성화할 수 있습니다.",
    example: "GLuint texture;\nglGenTextures(1, &texture);\n\n// 여러 텍스처 생성\nGLuint textures[3];\nglGenTextures(3, textures);",
    tags: ["Textures"]
  },
  
  glTexImage2D: {
    name: "glTexImage2D",
    params: [
      {
        name: "target",
        type: "GLenum",
        description: "텍스처 타겟을 지정합니다. 가장 일반적으로 GL_TEXTURE_2D를 사용합니다."
      },
      {
        name: "level",
        type: "GLint",
        description: "밉맵 레벨을 지정합니다. 0이 베이스 이미지 레벨입니다."
      },
      {
        name: "internalFormat",
        type: "GLint",
        description: "텍스처의 내부 포맷을 지정합니다 (GL_RGB, GL_RGBA 등)."
      },
      {
        name: "width",
        type: "GLsizei",
        description: "텍스처 이미지의 너비를 지정합니다."
      },
      {
        name: "height",
        type: "GLsizei",
        description: "텍스처 이미지의 높이를 지정합니다."
      },
      {
        name: "border",
        type: "GLint",
        description: "테두리 너비입니다. 항상 0이어야 합니다 (레거시 값)."
      },
      {
        name: "format",
        type: "GLenum",
        description: "픽셀 데이터의 포맷을 지정합니다 (GL_RGB, GL_RGBA 등)."
      },
      {
        name: "type",
        type: "GLenum",
        description: "픽셀 데이터의 데이터 타입을 지정합니다 (GL_UNSIGNED_BYTE 등)."
      },
      {
        name: "data",
        type: "const void*",
        description: "이미지 데이터에 대한 포인터입니다."
      }
    ],
    description: "현재 바인딩된 텍스처 객체의 활성 텍스처 유닛에서 텍스처 이미지를 생성합니다. 이 함수는 목적지와 소스 데이터로부터 소스 이미지가 예상되는 위치(바이트 배열)를 지정합니다.",
    example: "// 이미지 로드 및 텍스처 생성\nint width, height;\nunsigned char* image = SOIL_load_image(filename, &width, &height, 0, SOIL_LOAD_RGB);\nglTexImage2D(GL_TEXTURE_2D, 0, GL_RGB, width, height, 0, GL_RGB, GL_UNSIGNED_BYTE, image);",
    tags: ["Textures"]
  },

  glGenerateMipmap: {
    name: "glGenerateMipmap",
    params: [
      {
        name: "target",
        type: "GLenum",
        description: "밉맵(mipmaps)을 생성할 텍스처 타겟을 지정합니다. GL_TEXTURE_2D가 일반적입니다."
      }
    ],
    description: "현재 바인딩된 텍스처에 대해 자동으로 모든 밉맵(mipmaps) 레벨을 생성합니다. 베이스 레벨 이미지에서 시작하여 1x1 픽셀 크기까지 각 레벨을 절반씩 축소하며 생성합니다.",
    example: "glTexImage2D(GL_TEXTURE_2D, 0, GL_RGB, width, height, 0, GL_RGB, GL_UNSIGNED_BYTE, image);\nglGenerateMipmap(GL_TEXTURE_2D);",
    tags: ["Textures"]
  },

  glBindTexture: {
    name: "glBindTexture",
    params: [
      {
        name: "target",
        type: "GLenum",
        description: "바인딩할 텍스처의 타겟을 지정합니다 (GL_TEXTURE_2D 등)."
      },
      {
        name: "texture",
        type: "GLuint",
        description: "바인딩할 텍스처 객체의 ID입니다."
      }
    ],
    description: "지정된 텍스처 객체를 현재 활성 텍스처 유닛에 바인딩합니다. 이후의 모든 텍스처 관련 명령은 이 텍스처에 적용됩니다.",
    example: "unsigned int texture;\nglGenTextures(1, &texture);\nglBindTexture(GL_TEXTURE_2D, texture);",
    tags: ["Textures"]
  },

  glVertexAttribPointer: {
    name: "glVertexAttribPointer",
    params: [
      {
        name: "index",
        type: "GLuint",
        description: "수정할 정점 속성의 인덱스를 지정합니다."
      },
      {
        name: "size",
        type: "GLint",
        description: "정점 속성의 구성 요소 수를 지정합니다 (1, 2, 3, 4)."
      },
      {
        name: "type",
        type: "GLenum",
        description: "배열의 각 구성 요소의 데이터 타입을 지정합니다."
      },
      {
        name: "normalized",
        type: "GLboolean",
        description: "고정 소수점 데이터 값을 정규화할지 여부를 지정합니다."
      },
      {
        name: "stride",
        type: "GLsizei",
        description: "연속된 정점 속성 사이의 바이트 오프셋을 지정합니다."
      },
      {
        name: "pointer",
        type: "const void*",
        description: "첫 번째 구성 요소에 대한 포인터를 지정합니다."
      }
    ],
    description: "정점 속성 배열의 위치와 데이터 형식을 정의합니다. 이 함수는 OpenGL에게 정점 데이터를 해석하는 방법을 알려줍니다.",
    example: "// 위치 속성 (location = 0)\nglVertexAttribPointer(0, 3, GL_FLOAT, GL_FALSE, 3 * sizeof(float), (void*)0);\nglEnableVertexAttribArray(0);",
    tags: ["Vertex", "Attributes"]
  },

  glUseProgram: {
    name: "glUseProgram",
    params: [
      {
        name: "program",
        type: "GLuint",
        description: "사용할 프로그램 객체의 핸들입니다."
      }
    ],
    description: "지정된 프로그램 객체를 현재 렌더링 상태의 일부로 설치합니다. 이후의 렌더링 명령은 이 프로그램의 쉐이더를 사용합니다.",
    example: "GLuint shaderProgram = glCreateProgram();\n// ... 쉐이더 컴파일 및 링크 ...\nglUseProgram(shaderProgram);",
    tags: ["Shaders", "Program"]
  },

  glTexParameteri: {
    name: "glTexParameteri",
    params: [
      {
        name: "target",
        type: "GLenum",
        description: "텍스처 유형을 지정합니다. GL_TEXTURE_2D, GL_TEXTURE_3D 등이 있습니다."
      },
      {
        name: "pname",
        type: "GLenum",
        description: "텍스처 매개변수를 지정합니다. GL_TEXTURE_WRAP_S, GL_TEXTURE_WRAP_T 등이 있습니다."
      },
      {
        name: "param",
        type: "GLint",
        description: "텍스처 매개변수의 값을 지정합니다."
      }
    ],
    description: "텍스처 매개변수를 설정합니다. 텍스처 유형, 텍스처 매핑 방식, 필터링 방식 등을 설정할 수 있습니다.",
    example: "glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_WRAP_S, GL_REPEAT);\nglTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_MIN_FILTER, GL_LINEAR);",
    tags: ["Textures"]
  },

  glTexParameterfv: {
    name: "glTexParameterfv",
    params: [
      {
        name: "target",
        type: "GLenum",
        description: "텍스처 유형을 지정합니다."
      },
      {
        name: "pname",
        type: "GLenum",
        description: "텍스처 매개변수를 지정합니다."
      },
      {
        name: "params",
        type: "const GLfloat*",
        description: "매개변수 값들의 배열입니다."
      }
    ],
    description: "텍스처 매개변수를 부동소수점 배열로 설정합니다. 주로 경계 색상 설정에 사용됩니다.",
    example: "float borderColor[] = { 1.0f, 1.0f, 0.0f, 1.0f };\nglTexParameterfv(GL_TEXTURE_2D, GL_TEXTURE_BORDER_COLOR, borderColor);",
    tags: ["Textures"]
  },

  glDrawElements: {
    name: "glDrawElements",
    params: [
      {
        name: "mode",
        type: "GLenum",
        description: "그릴 프리미티브의 종류를 지정합니다. GL_POINTS, GL_LINE_STRIP, GL_LINE_LOOP, GL_LINES, GL_TRIANGLE_STRIP, GL_TRIANGLE_FAN, GL_TRIANGLES 등이 가능합니다."
      },
      {
        name: "count",
        type: "GLsizei",
        description: "그릴 정점/요소의 개수를 지정합니다 (인덱스 사용)."
      },
      {
        name: "type",
        type: "GLenum",
        description: "인덱스 값들의 타입을 지정합니다. GL_UNSIGNED_BYTE, GL_UNSIGNED_SHORT, GL_UNSIGNED_INT 중 하나입니다."
      },
      {
        name: "indices",
        type: "const GLvoid*",
        description: "인덱스가 저장된 버퍼의 오프셋을 지정하거나 인덱스 배열에 대한 포인터입니다 (EBO가 바인딩되지 않은 경우)."
      }
    ],
    description: "현재 바인딩된 VBO와 EBO를 사용하여 인덱스 기반 렌더링을 수행합니다. 이 함수는 indexed drawing을 가능하게 하여 중복된 정점을 제거하고 glDrawArrays보다 효율적인 렌더링을 제공합니다. EBO에 저장된 인덱스 순서에 따라 VBO의 정점들을 그립니다.",
    example: "glDrawElements(GL_TRIANGLES, 6, GL_UNSIGNED_INT, 0);",
    tags: ["Drawing", "Rendering", "Indexed Drawing"]
  },

  glGetIntegerv: {
    name: "glGetIntegerv",
    params: [
      {
        name: "pname",
        type: "GLenum",
        description: "조회할 매개변수의 이름을 지정합니다. GL_MAX_VERTEX_ATTRIBS, GL_VIEWPORT 등이 있습니다."
      },
      {
        name: "data",
        type: "GLint*",
        description: "조회된 값이 저장될 배열의 포인터입니다."
      }
    ],
    description: "OpenGL 상태 변수의 정수 값을 조회합니다. 다양한 OpenGL 제한값이나 현재 설정을 확인할 때 사용됩니다.",
    example: "int nrAttributes;\nglGetIntegerv(GL_MAX_VERTEX_ATTRIBS, &nrAttributes);\nstd::cout << \"Maximum nr of vertex attributes supported: \" << nrAttributes << std::endl;",
    tags: ["State", "Query"]
  },

  glGetAttribLocation: {
    name: "glGetAttribLocation",
    params: [
      {
        name: "program",
        type: "GLuint",
        description: "쿼리할 프로그램 객체를 지정합니다."
      },
      {
        name: "name",
        type: "const GLchar*",
        description: "위치를 쿼리할 정점 속성의 이름을 포함하는 null로 끝나는 문자열에 대한 포인터입니다."
      }
    ],
    description: "링킹 단계에서 할당된 정점 속성 위치를 주어진 쉐이더 프로그램과 속성 이름을 통해 조회합니다. 위치를 찾을 수 없으면 -1을 반환합니다. 이는 속성 이름이 잘못되었거나, 정점 속성이 실제로 쉐이더 코드에서 사용되지 않아 컴파일러에 의해 삭제/최적화되었기 때문일 수 있습니다.",
    example: "GLint vertAttribLoc;\nvertAttribLoc = glGetAttribLocation(shaderProgram, \"position\");\nglEnableVertexAttribArray(vertAttribLoc);",
    tags: ["Shaders", "Attributes"]
  },

  glfwGetTime: {
    name: "glfwGetTime",
    params: [],
    description: "GLFW가 초기화된 이후 경과된 시간을 초 단위로 반환합니다.",
    example: "float timeValue = glfwGetTime();\nfloat greenValue = (sin(timeValue) / 2.0f) + 0.5f;",
    tags: ["GLFW", "Time"]
  },

  glGetUniformLocation: {
    name: "glGetUniformLocation",
    params: [
      {
        name: "program",
        type: "GLuint",
        description: "uniform 변수를 포함하는 프로그램 객체"
      },
      {
        name: "name",
        type: "const GLchar*",
        description: "uniform 변수의 이름"
      }
    ],
    description: "지정된 프로그램에서 uniform 변수의 위치를 조회합니다. uniform이 존재하지 않거나 사용되지 않으면 -1을 반환합니다.",
    example: "int vertexColorLocation = glGetUniformLocation(shaderProgram, \"ourColor\");\nglUniform4f(vertexColorLocation, 0.0f, greenValue, 0.0f, 1.0f);",
    tags: ["Shaders", "Uniforms"]
  },

  glUniform: {
    name: "glUniform",
    params: [
      {
        name: "location",
        type: "GLint",
        description: "수정할 uniform 변수의 위치"
      },
      {
        name: "value",
        type: "다양한 타입",
        description: "uniform 변수에 설정할 값 (1~4개의 float, int 또는 벡터/행렬)"
      }
    ],
    description: "현재 활성화된 쉐이더 프로그램의 uniform 변수에 값을 설정합니다. glUniform1f, glUniform2f, glUniform3f, glUniform4f, glUniform1i, glUniform2i, glUniform3i, glUniform4i 등 다양한 변형이 있으며, 각각 다른 타입과 개수의 값을 설정할 수 있습니다.",
    example: "// float 값 설정\nglUniform1f(location, 1.0f);\nglUniform4f(location, 1.0f, 0.5f, 0.2f, 1.0f);\n\n// int 값 설정\nglUniform1i(location, 1);\n\n// 벡터 설정\nfloat values[] = {1.0f, 0.5f, 0.2f};\nglUniform3fv(location, 1, values);",
    tags: ["Shaders", "Uniforms"]
  },

  glEnableVertexAttribArray: {
    name: "glEnableVertexAttribArray",
    params: [
      {
        name: "index",
        type: "GLuint",
        description: "활성화할 정점 속성 배열의 인덱스를 지정합니다."
      }
    ],
    description: "지정된 인덱스의 정점 속성 배열을 활성화합니다. 이 함수를 호출해야 해당 속성이 정점 쉐이더에서 사용될 수 있습니다.",
    example: "glVertexAttribPointer(0, 3, GL_FLOAT, GL_FALSE, 3 * sizeof(float), (void*)0);\nglEnableVertexAttribArray(0);",
    tags: ["Vertex", "Attributes"]
  },

  glDrawArrays: {
    name: "glDrawArrays",
    params: [
      {
        name: "mode",
        type: "GLenum",
        description: "그릴 프리미티브의 종류를 지정합니다. GL_POINTS, GL_LINE_STRIP, GL_LINE_LOOP, GL_LINES, GL_TRIANGLE_STRIP, GL_TRIANGLE_FAN, GL_TRIANGLES 등이 가능합니다."
      },
      {
        name: "first",
        type: "GLint",
        description: "활성화된 배열에서 시작할 인덱스를 지정합니다."
      },
      {
        name: "count",
        type: "GLsizei",
        description: "렌더링할 인덱스의 개수를 지정합니다."
      }
    ],
    description: "현재 바인딩된 정점 배열 객체(VAO)의 데이터를 사용하여 프리미티브를 렌더링합니다. 인덱스를 사용하지 않는 직접적인 정점 렌더링 방식입니다.",
    example: "glBindVertexArray(VAO);\nglDrawArrays(GL_TRIANGLES, 0, 3);\nglBindVertexArray(0);",
    tags: ["Drawing", "Rendering"]
  },

  glfwInit: {
    name: "glfwInit",
    params: [],
    description: "GLFW 라이브러리를 초기화합니다. 대부분의 GLFW 함수들이 사용되기전에 GLFW가 초기화 되어야 합니다.",
    example: "if (!glfwInit()) {\n    // 초기화 실패 처리\n    return -1;\n}",
    tags: ["GLFW", "Initialization"]
  },

  glfwWindowHint: {
    name: "glfwWindowHint",
    params: [
      {
        name: "target",
        type: "int",
        description: "변경하려는 설정 항목을 지정합니다. GLFW_로 시작하는 열거형 상수를 사용합니다."
      },
      {
        name: "hint",
        type: "int",
        description: "지정한 옵션(target)에 대해 설정할 값입니다."
      }
    ],
    description: "이후 호출될 glfwCreateWindow 함수에 적용할 설정값을 지정합니다. 이 설정값들은 재설정되기 전까지 유지됩니다. 다양한 창 속성(OpenGL 버전, 리사이즈 가능 여부 등)을 미리 설정하는 데 사용됩니다.",
    example: "glfwWindowHint(GLFW_CONTEXT_VERSION_MAJOR, 3);\nglfwWindowHint(GLFW_CONTEXT_VERSION_MINOR, 3);\nglfwWindowHint(GLFW_RESIZABLE, GL_FALSE);",
    tags: ["GLFW", "Window"]
  },

  glfwCreateWindow: {
    name: "glfwCreateWindow",
    params: [
      {
        name: "width",
        type: "int",
        description: "윈도우의 원하는 가로 크기(스크린 좌표 단위)입니다."
      },
      {
        name: "height",
        type: "int",
        description: "윈도우의 원하는 세로 크기(스크린 좌표 단위)입니다."
      },
      {
        name: "title",
        type: "const char*",
        description: "초기 윈도우 제목입니다."
      },
      {
        name: "monitor",
        type: "GLFWmonitor*",
        description: "전체 화면 모드에서 사용할 모니터입니다. 창 모드를 사용하려면 NULL을 지정합니다."
      },
      {
        name: "share",
        type: "GLFWwindow*",
        description: "리소스를 공유할 다른 윈도우의 컨텍스트입니다. 공유하지 않으려면 NULL을 사용합니다."
      }
    ],
    description: "윈도우와 그에 연결된 OpenGL 컨텍스트를 생성합니다. 윈도우의 동작 방식을 제어하는 대부분의 설정은 glfwWindowHint를 통해 사전에 설정해야 합니다. 윈도우를 성공적으로 생성하더라도, 현재 활성화된 컨텍스트는 바뀌지 않습니다. 새로 생성된 컨텍스트를 사용하려면 반드시 glfwMakeContextCurrent를 호출해 해당 컨텍스트를 활성화해야 합니다.",
    example: "GLFWwindow* window;\nwindow = glfwCreateWindow(800, 600, \"LearnOpenGL\", nullptr, nullptr);",
    tags: ["GLFW", "Window"]
  },

  glfwMakeContextCurrent: {
    name: "glfwMakeContextCurrent",
    params: [
      {
        name: "window",
        type: "GLFWwindow*",
        description: "현재 스레드에서 활성화할 OpenGL 컨텍스트를 가진 GLFW 윈도우입니다."
      }
    ],
    description: "지정된 윈도우의 OpenGL 컨텍스트를 호출한 스레드에서 현재 컨텍스트로 설정합니다. 하나의 컨텍스트는 동시에 하나의 스레드에서만 활성화될 수 있으며, 각 스레드는 동시에 하나의 컨텍스트만을 가질 수 있습니다.",
    example: "glfwMakeContextCurrent(window);",
    tags: ["GLFW", "Context"]
  },

  glViewport: {
    name: "glViewport",
    params: [
      {
        name: "x",
        type: "GLint",
        description: "뷰포트 사각형의 왼쪽 x좌표입니다. 윈도우 내 위치를 픽셀 기준으로 설정합니다."
      },
      {
        name: "y",
        type: "GLint",
        description: "뷰포트 사각형의 아래쪽 y좌표입니다. OpenGL에서는 y=0이 윈도우의 하단을 의미합니다."
      },
      {
        name: "width",
        type: "GLsizei",
        description: "뷰포트의 가로 너비를 지정합니다."
      },
      {
        name: "height",
        type: "GLsizei",
        description: "뷰포트의 세로 높이를 지정합니다."
      }
    ],
    description: "OpenGL 렌더링을 위한 실제 윈도우 내 렌더링 영역(뷰포트)을 설정합니다. 뷰포트는 정규화 장치 좌표(-1 ~ 1 범위)를 윈도우 좌표로 매핑하는 기준이 됩니다. 지정된 좌표를 통해 OpenGL이 데이터를 창 내 어느 영역에 표시할지 결정합니다.",
    example: "glViewport(0, 0, 800, 600);",
    tags: ["OpenGL", "Viewport"]
  },

  glfwWindowShouldClose: {
    name: "glfwWindowShouldClose",
    params: [
      {
        name: "window",
        type: "GLFWwindow*",
        description: "종료 여부를 확인할 GLFW 윈도우 객체입니다."
      }
    ],
    description: "지정된 윈도우가 종료 요청을 받았는지를 확인합니다. 종료 요청이 있다면 GL_TRUE를 반환하고, 그렇지 않다면 계속해서 GL_FALSE를 반환합니다. 일반적으로 렌더링 루프를 유지할지 여부를 결정하는 조건문에 사용됩니다.",
    example: "while (!glfwWindowShouldClose(window)) {\n    // 이벤트 처리\n    // 렌더링\n    // 버퍼 교환\n}",
    tags: ["GLFW", "Window"]
  },

  glfwPollEvents: {
    name: "glfwPollEvents",
    params: [],
    description: "현재까지 수신된 모든 이벤트(예: 키보드 입력, 마우스 움직임 등)를 처리한 뒤 즉시 반환됩니다. 이벤트를 처리하면, 해당 이벤트에 등록된 창 및 입력 콜백 함수들이 호출됩니다.",
    example: "glfwPollEvents();",
    tags: ["GLFW", "Events"]
  },

  glfwSwapBuffers: {
    name: "glfwSwapBuffers",
    params: [
      {
        name: "window",
        type: "GLFWwindow*",
        description: "버퍼를 교환할 윈도우입니다."
      }
    ],
    description: "지정된 윈도우의 프론트 버퍼(front buffer)와 백 버퍼(back buffer)를 서로 교체(swap)합니다. 일반적으로 OpenGL은 더블 버퍼링(double buffering)을 사용하여 화면 깜빡임을 방지합니다. 백 버퍼에서 렌더링을 수행한 후, 이 함수를 호출하여 백 버퍼를 프론트 버퍼로 전환하면 사용자에게 완성된 이미지를 한 번에 보여줄 수 있어 렌더링 중간 단계가 노출되는 문제를 방지할 수 있습니다.",
    example: "glfwSwapBuffers(window);",
    tags: ["GLFW", "Rendering"]
  },

  glfwTerminate: {
    name: "glfwTerminate",
    params: [],
    description: "남아 있는 모든 윈도우를 제거하고, GLFW에서 할당한 모든 리소스를 해제하며, 라이브러리를 초기화되지 않은 상태로 되돌립니다. 이 함수가 호출된 이후에는 다시 GLFW 기능을 사용하려면 glfwInit을 성공적으로 다시 호출해야 합니다. 보통 렌더링 루프(또는 게임 루프)가 종료된 후, 리소스를 정리하고 애플리케이션을 종료하기 위해 호출하는 것이 좋은 관례입니다.",
    example: "glfwTerminate();",
    tags: ["GLFW", "Cleanup"]
  },

  glClear: {
    name: "glClear",
    params: [
      {
        name: "mask",
        type: "GLbitfield",
        description: "지울 버퍼를 지정하는 비트마스크입니다. GL_COLOR_BUFFER_BIT, GL_DEPTH_BUFFER_BIT, GL_STENCIL_BUFFER_BIT 중 하나 이상을 OR 연산자로 조합하여 사용합니다."
      }
    ],
    description: "현재 프레임버퍼의 전체 버퍼를 초기화합니다. 지정된 버퍼 타입에 따라 색상 버퍼는 glClearColor로 설정된 색상으로, 깊이 버퍼는 glClearDepth로 설정된 값으로, 스텐실 버퍼는 glClearStencil로 설정된 값으로 초기화됩니다.",
    example: "glClearColor(0.2f, 0.3f, 0.3f, 1.0f);\nglClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);",
    tags: ["OpenGL", "Rendering"]
  },

  glClearColor: {
    name: "glClearColor",
    params: [
      {
        name: "red",
        type: "GLfloat",
        description: "빨간색 성분 값 (0.0 ~ 1.0 범위)"
      },
      {
        name: "green",
        type: "GLfloat",
        description: "초록색 성분 값 (0.0 ~ 1.0 범위)"
      },
      {
        name: "blue",
        type: "GLfloat",
        description: "파란색 성분 값 (0.0 ~ 1.0 범위)"
      },
      {
        name: "alpha",
        type: "GLfloat",
        description: "알파(투명도) 성분 값 (0.0 ~ 1.0 범위)"
      }
    ],
    description: "색상 버퍼를 초기화할 때 사용할 색상을 설정합니다. glClear(GL_COLOR_BUFFER_BIT)가 호출될 때마다 화면이 이 색상으로 채워집니다. 각 색상 성분은 0.0(최소값)에서 1.0(최대값) 사이의 값을 가집니다.",
    example: "glClearColor(0.2f, 0.3f, 0.3f, 1.0f); // 어두운 청록색\nglClearColor(0.0f, 0.0f, 0.0f, 1.0f); // 검은색\nglClearColor(1.0f, 1.0f, 1.0f, 1.0f); // 흰색",
    tags: ["OpenGL", "Rendering"]
  },

  glGenBuffers: {
    name: "glGenBuffers",
    params: [
      {
        name: "n",
        type: "GLsizei",
        description: "생성할 버퍼 객체의 개수입니다."
      },
      {
        name: "buffers",
        type: "GLuint*",
        description: "생성된 버퍼 객체의 ID들이 저장될 배열의 포인터입니다."
      }
    ],
    description: "OpenGL에서 하나 또는 여러 개의 버퍼 객체를 생성합니다. 버퍼 객체는 정점 데이터, 인덱스 데이터 등을 GPU 메모리에 저장하기 위해 사용됩니다. 생성된 각 버퍼 객체에는 고유한 ID가 부여되며, 이 ID를 통해 해당 버퍼를 참조할 수 있습니다.",
    example: "GLuint VBO; // 버퍼 ID를 저장할 변수\nglGenBuffers(1, &VBO); // 1개의 버퍼 생성\n\n// 여러 개 생성하는 경우\nGLuint buffers[3];\nglGenBuffers(3, buffers); // 3개의 버퍼 생성",
    tags: ["Buffer Management", "OpenGL Objects"]
  },

  glBindBuffer: {
    name: "glBindBuffer",
    params: [
      {
        name: "target",
        type: "GLenum",
        description: "바인딩할 버퍼의 타입을 지정합니다. 가장 일반적인 것은 GL_ARRAY_BUFFER와 GL_ELEMENT_ARRAY_BUFFER입니다."
      },
      {
        name: "buffer",
        type: "GLuint",
        description: "바인딩할 버퍼 객체의 ID입니다. 0을 전달하면 현재 바인딩된 버퍼를 해제합니다."
      }
    ],
    description: "버퍼 객체를 현재 버퍼 타입 타겟에 바인딩합니다. 한 번에 각 버퍼 타입당 하나의 버퍼만 바인딩될 수 있습니다. 버퍼를 바인딩하면 해당 타입에 대한 모든 후속 버퍼 작업이 현재 바인딩된 버퍼에 적용됩니다.",
    example: "glBindBuffer(GL_ARRAY_BUFFER, VBO);\n// 이제 GL_ARRAY_BUFFER 타겟에 대한 모든 작업이 VBO에 적용됩니다\n\n// 바인딩 해제\nglBindBuffer(GL_ARRAY_BUFFER, 0);",
    tags: ["Buffer Management", "OpenGL State"]
  },

  glBufferData: {
    name: "glBufferData",
    params: [
      {
        name: "target",
        type: "GLenum",
        description: "버퍼 객체의 타겟을 지정합니다. 가장 일반적인 것은 GL_ARRAY_BUFFER와 GL_ELEMENT_ARRAY_BUFFER입니다."
      },
      {
        name: "size",
        type: "GLsizeiptr",
        description: "버퍼 객체의 새로운 데이터 저장소 크기를 바이트 단위로 지정합니다."
      },
      {
        name: "data",
        type: "const GLvoid*",
        description: "버퍼로 복사될 데이터에 대한 포인터입니다. NULL이면 할당된 메모리를 비워둡니다."
      },
      {
        name: "usage",
        type: "GLenum",
        description: "데이터의 예상 사용 패턴입니다. 가장 일반적인 것은 GL_STATIC_DRAW, GL_DYNAMIC_DRAW, GL_STREAM_DRAW입니다."
      }
    ],
    description: "현재 바인딩된 버퍼 객체에 메모리를 할당하고 데이터를 저장합니다. 버퍼 객체를 추가/편집하는 여러 함수 중 하나입니다. 이 함수는 이전에 할당된 데이터를 새로운 데이터로 대체합니다.",
    example: "GLfloat vertices[] = {\n    0.0f,  0.5f, 0.0f,\n   -0.5f, -0.5f, 0.0f,\n    0.5f, -0.5f, 0.0f\n};\nglBufferData(GL_ARRAY_BUFFER, sizeof(vertices), vertices, GL_STATIC_DRAW);",
    tags: ["Buffer Management", "Data Upload"]
  },

  glCreateShader: {
    name: "glCreateShader",
    params: [
      {
        name: "shaderType",
        type: "GLenum",
        description: "생성할 쉐이더의 타입을 지정합니다. GL_VERTEX_SHADER, GL_FRAGMENT_SHADER, GL_GEOMETRY_SHADER, GL_TESS_CONTROL_SHADER, GL_TESS_EVALUATION_SHADER, GL_COMPUTE_SHADER 중 하나입니다."
      }
    ],
    description: "빈 쉐이더 객체를 생성하고 해당 쉐이더 객체에 대한 고유한 참조 ID를 반환합니다. 쉐이더 객체는 쉐이더 소스 코드를 저장하고 컴파일하는 데 사용됩니다. 오류가 발생하면 0을 반환합니다.",
    example: "unsigned int vertexShader = glCreateShader(GL_VERTEX_SHADER);\nunsigned int fragmentShader = glCreateShader(GL_FRAGMENT_SHADER);\n\n// 쉐이더 생성 확인\nif (vertexShader == 0) {\n    // 오류 처리\n}",
    tags: ["Shaders", "OpenGL Objects"]
  },

  glShaderSource: {
    name: "glShaderSource",
    params: [
      {
        name: "shader",
        type: "GLuint",
        description: "소스 코드를 교체할 쉐이더 객체를 지정합니다."
      },
      {
        name: "count",
        type: "GLsizei",
        description: "string 배열의 요소 개수를 지정합니다."
      },
      {
        name: "string",
        type: "const GLchar**",
        description: "소스 코드를 포함하는 문자열들의 포인터 배열입니다."
      },
      {
        name: "length",
        type: "const GLint*",
        description: "각 문자열의 길이를 지정하는 배열입니다. NULL이면 문자열이 null-terminated라고 가정합니다."
      }
    ],
    description: "주어진 쉐이더 객체의 소스 코드를 교체합니다. 쉐이더가 컴파일될 때마다 현재 소스 코드가 사용됩니다.",
    example: "glShaderSource(vertexShader, 1, &vertexShaderSource, NULL);",
    tags: ["Shaders", "Source Code"]
  },

  glCompileShader: {
    name: "glCompileShader",
    params: [
      {
        name: "shader",
        type: "GLuint",
        description: "컴파일할 쉐이더 객체를 지정합니다."
      }
    ],
    description: "쉐이더 객체를 컴파일합니다. 컴파일은 쉐이더 객체에 연결된 소스 코드 문자열을 기반으로 수행됩니다. 컴파일 상태는 쉐이더 객체의 일부로 저장되며, glGetShaderiv 함수를 통해 확인할 수 있습니다.",
    example: "glCompileShader(vertexShader);\n\n// 컴파일 성공 여부 확인\nint success;\nglGetShaderiv(vertexShader, GL_COMPILE_STATUS, &success);\nif (!success) {\n    // 컴파일 오류 처리\n}",
    tags: ["Shaders", "Compilation"]
  },

  glGetShaderiv: {
    name: "glGetShaderiv",
    params: [
      {
        name: "shader",
        type: "GLuint",
        description: "쿼리할 쉐이더 객체를 지정합니다."
      },
      {
        name: "pname",
        type: "GLenum",
        description: "객체 파라미터를 지정합니다. GL_SHADER_TYPE, GL_DELETE_STATUS, GL_COMPILE_STATUS, GL_INFO_LOG_LENGTH, GL_SHADER_SOURCE_LENGTH 등이 있습니다."
      },
      {
        name: "params",
        type: "GLint*",
        description: "요청된 객체 파라미터를 반환할 GLint 배열의 포인터입니다."
      }
    ],
    description: "쉐이더 객체에 대한 정보를 쿼리할 수 있게 해주는 함수입니다. 개발자가 쉐이더 객체의 다양한 속성과 상태를 확인할 수 있습니다.",
    example: "GLint success;\nglGetShaderiv(vertexShader, GL_COMPILE_STATUS, &success);\n\n// 다른 정보들도 확인 가능\nGLint logLength;\nglGetShaderiv(shader, GL_INFO_LOG_LENGTH, &logLength);",
    tags: ["Shaders", "Query"]
  },

  glGetShaderInfoLog: {
    name: "glGetShaderInfoLog",
    params: [
      {
        name: "shader",
        type: "GLuint",
        description: "정보 로그를 쿼리할 쉐이더 객체를 지정합니다."
      },
      {
        name: "maxLength",
        type: "GLsizei",
        description: "반환된 정보 로그를 저장할 문자 버퍼의 크기를 지정합니다."
      },
      {
        name: "length",
        type: "GLsizei*",
        description: "infoLog에 반환된 문자열의 길이를 반환합니다 (null terminator 제외). NULL이면 길이를 반환하지 않습니다."
      },
      {
        name: "infoLog",
        type: "GLchar*",
        description: "정보 로그를 반환하는 데 사용되는 문자 배열을 지정합니다."
      }
    ],
    description: "쉐이더 객체의 정보 로그를 반환합니다. 정보 로그에는 쉐이더 컴파일과 관련된 정보가 포함됩니다. 쉐이더 컴파일이 실패하면 컴파일 타임 오류를 확인하기 위해 쉐이더의 정보 로그를 확인하는 것이 좋습니다.",
    example: "char infoLog[512];\nglGetShaderInfoLog(vertexShader, 512, NULL, infoLog);",
    tags: ["Shaders", "Error Handling"]
  },

  glCreateProgram: {
    name: "glCreateProgram",
    params: [],
    description: "프로그램 객체를 생성하고 해당 프로그램 객체에 대한 고유한 참조 ID를 반환합니다. 프로그램 객체는 쉐이더들을 연결하고 링크하는 데 사용됩니다. 오류가 발생하면 0을 반환합니다.",
    example: "unsigned int shaderProgram = glCreateProgram();",
    tags: ["Shaders", "Program Objects"]
  },

  glAttachShader: {
    name: "glAttachShader",
    params: [
      {
        name: "program",
        type: "GLuint",
        description: "쉐이더를 연결할 프로그램 객체를 지정합니다."
      },
      {
        name: "shader",
        type: "GLuint",
        description: "프로그램에 연결할 쉐이더 객체를 지정합니다."
      }
    ],
    description: "쉐이더 객체를 프로그램 객체에 연결합니다. 프로그램이 링크될 때 연결된 쉐이더들이 함께 링크됩니다.",
    example: "glAttachShader(shaderProgram, vertexShader);\nglAttachShader(shaderProgram, fragmentShader);",
    tags: ["Shaders", "Program Objects"]
  },

  glLinkProgram: {
    name: "glLinkProgram",
    params: [
      {
        name: "program",
        type: "GLuint",
        description: "링크할 프로그램 객체를 지정합니다."
      }
    ],
    description: "연결된 모든 쉐이더를 하나의 최종 쉐이더 프로그램 객체로 링크합니다. 링크 단계에서 각 출력이 각 쉐이더의 입력과 일치하는지 확인하고, 일치하지 않으면 링크가 실패합니다.",
    example: "glLinkProgram(shaderProgram);",
    tags: ["Shaders", "Program Linking"]
  },

  glDeleteShader: {
    name: "glDeleteShader",
    params: [
      {
        name: "shader",
        type: "GLuint",
        description: "삭제할 쉐이더 객체를 지정합니다."
      }
    ],
    description: "쉐이더 객체를 삭제합니다. 쉐이더가 프로그램 객체에 연결되어 있으면 즉시 삭제되지 않고 삭제 플래그가 설정됩니다. 프로그램에서 분리되면 실제로 삭제됩니다.",
    example: "glDeleteShader(vertexShader);\nglDeleteShader(fragmentShader);",
    tags: ["Shaders", "Resource Management"]
  },

  glGenVertexArrays: {
    name: "glGenVertexArrays",
    params: [
      {
        name: "n",
        type: "GLsizei",
        description: "생성할 정점 배열 객체의 개수입니다."
      },
      {
        name: "arrays",
        type: "GLuint*",
        description: "생성된 정점 배열 객체의 ID들이 저장될 배열의 포인터입니다."
      }
    ],
    description: "하나 또는 여러 개의 정점 배열 객체(VAO)를 생성합니다. VAO는 정점 속성 구성을 저장하여 렌더링 시 빠르게 전환할 수 있게 해줍니다.",
    example: "GLuint VAO;\nglGenVertexArrays(1, &VAO);",
    tags: ["Vertex Arrays", "OpenGL Objects"]
  },

  glBindVertexArray: {
    name: "glBindVertexArray",
    params: [
      {
        name: "array",
        type: "GLuint",
        description: "바인딩할 VAO를 지정합니다."
      }
    ],
    description: "정점 배열 객체를 바인딩합니다. 이후의 모든 VBO, EBO, glVertexAttribPointer 및 glEnableVertexAttribArray 호출이 현재 바인딩된 VAO 내부에 저장됩니다.",
    example: "glBindVertexArray(VAO);",
    tags: ["Vertex Arrays", "OpenGL State"]
  },

  glPolygonMode: {
    name: "glPolygonMode",
    params: [
      {
        name: "face",
        type: "GLenum",
        description: "모드가 적용될 폴리곤을 지정합니다. GL_FRONT, GL_BACK, GL_FRONT_AND_BACK 값을 가질 수 있습니다."
      },
      {
        name: "mode",
        type: "GLenum",
        description: "폴리곤이 어떻게 래스터화될지 지정합니다. GL_POINT, GL_LINE, GL_FILL 값을 가질 수 있습니다. 초기값은 앞면과 뒷면 폴리곤 모두 GL_FILL입니다."
      }
    ],
    description: "OpenGL이 프리미티브를 그리는 방식인 폴리곤 래스터화 모드를 설정합니다. 개발자는 원한다면 프리미티브를 선이나 점으로 그리도록 선택할 수 있습니다. 이후의 모든 그리기 호출은 설정된 래스터화 모드를 사용합니다.",
    example: "glPolygonMode(GL_FRONT_AND_BACK, GL_LINE); // 와이어프레임 모드\nglPolygonMode(GL_FRONT_AND_BACK, GL_FILL); // 기본 모드",
    tags: ["Drawing", "Rendering Mode"]
  },

  glActiveTexture: {
    name: "glActiveTexture",
    params: [
      {
        name: "texture",
        type: "GLenum",
        description: "활성화할 텍스처 유닛을 지정합니다. GL_TEXTURE0부터 GL_TEXTURE31까지의 값을 가질 수 있습니다."
      }
    ],
    description: "주어진 텍스처 유닛을 활성화합니다. 이후의 모든 glBindTexture 호출은 현재 활성화된 텍스처 유닛에 영향을 미칩니다. 여러 텍스처를 하나의 그리기 호출에 바인딩할 수 있게 해줍니다.",
    example: "glActiveTexture(GL_TEXTURE0);\nglBindTexture(GL_TEXTURE_2D, texture1);\nglActiveTexture(GL_TEXTURE1);\nglBindTexture(GL_TEXTURE_2D, texture2);",
    tags: ["Textures", "Multi-texturing"]
  }
};
