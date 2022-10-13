from typing import Any, Callable
import functools
import re
import loguru
def log_response(f: Callable[..., Any]):
    @functools.wraps(f)
    def wrapper(*args, **kwargs):
        response = f(*args, **kwargs)
        loguru.logger.debug(f'{f.__module__}:{f.__qualname__} -> {response}')
        return response
    return wrapper

def check_permission(permission: str, required: str):
    if permission.startswith('-'):
        return not check_permission(permission[1:], required)
    if re.match(f'^{permission}.*$'.replace('*', '.*'), required):
        return True
