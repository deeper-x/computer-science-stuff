'''
Steps to remember for decorators, are:
1) start w/ one or more functions you want to decorate, and write it as mock
2) create the "inner dec": a decorator function, who takes a fun as input and return a wrapper fun, where there is more code and logic. This is
the core of decorator: input parameter will be taken by "@" syntactic sugar, and inner fun
is where the logic happens. Inside this inner fun, input fun is executed with some other logic,
the reason we use decorator.
3) The outer function, who returns the inner_dec. This is needed for passing the parameter
passed to the @label(par) 

'''

def add_syms(isym, tot=1): # 3 - third level, needed if you want to pass params to decorator 
    def inner_dec(ifun): # 2 - the core decorator: fun as input, fun as output
        def wrapper(who): # 1 - inside this fun, logic happens
            ret_val = ifun(who)  
            return isym * tot + ret_val + isym * tot # 2 - return to the "core" decorator
        return wrapper
    return inner_dec

@add_syms("#", 3)
def get_banner(who):
    return "Hello, {who}!".format(who=who)


if __name__ == '__main__':
    print(get_banner("FooUsername"))
        
