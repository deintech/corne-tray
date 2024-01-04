#include <napi.h>

#ifdef _WIN32
  #include <windows.h>
#else
  #include <X11/XKBlib.h>
#endif

#include <iostream>

using namespace std;

Napi::Value GetCapsState(const Napi::CallbackInfo &args)
{
  Napi::Env env = args.Env();

  #ifdef _WIN32 // MS Windows version
    return Napi::Boolean::New(env, (GetKeyState(VK_CAPITAL) & 0x0001) == 0);
  #else // X11 version (Linux/Unix/Mac OS X)
    Display * d = XOpenDisplay((char*)0);
    bool caps_state = false;
    if (d)
    {
      unsigned n;
      XkbGetIndicatorState(d, XkbUseCoreKbd, &n);
      caps_state = (n & 0x01) == 1;
    }
    return Napi::Boolean::New(env, caps_state);
  #endif
}

Napi::Value GetNumState(const Napi::CallbackInfo &args)
{
  Napi::Env env = args.Env();

  #ifdef _WIN32 // MS Windows version
    return Napi::Boolean::New(env, (GetKeyState(VK_NUMLOCK) & 0x0001) == 0);
  #else // X11 version (Linux/Unix/Mac OS X)
    // TODO: check this implementation
    Display * d = XOpenDisplay(NULL);
    bool num_state = false;
    if (d)
    {
      unsigned n;
      XkbGetIndicatorState(d, XkbUseCoreKbd, &n);
      num_state = (n & 0x02) == 2;
      XCloseDisplay(d);
    }
    return Napi::Boolean::New(env, num_state);
    return false
  #endif
}

Napi::Value GetScrollState(const Napi::CallbackInfo &args)
{
  Napi::Env env = args.Env();

  #ifdef _WIN32 // MS Windows version
    return Napi::Boolean::New(env, (GetKeyState(VK_SCROLL) & 0x0001) == 0);
  #else // X11 version (Linux/Unix/Mac OS X)
    // TODO: check this implementation
    Display * d = XOpenDisplay(NULL);
    bool scroll_state = false;
    if (d)
    {
      unsigned n;
      XkbGetIndicatorState(d, XkbUseCoreKbd, &n);
      scroll_state = (n & 0x04) == 4;
      XCloseDisplay(d);
    }
    return Napi::Boolean::New(env, scroll_state);
    return false
  #endif
}

Napi::Object Init(Napi::Env env, Napi::Object exports)
{
  exports.Set(Napi::String::New(env, "getCapsState"),
              Napi::Function::New(env, GetCapsState));
  exports.Set(Napi::String::New(env, "getNumState"),
              Napi::Function::New(env, GetNumState));
  exports.Set(Napi::String::New(env, "getScrollState"),
              Napi::Function::New(env, GetScrollState));
  return exports;
}

NODE_API_MODULE(controlModifiers, Init)
