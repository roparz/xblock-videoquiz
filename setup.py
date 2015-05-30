from setuptools import setup

setup(
    name='xblock-videoquiz',
    version='0.1',
    description='VideoQuiz XBlock',
    py_modules=['videoquiz'],
    install_requires=['XBlock'],
    entry_points={
        'xblock.v1': [
            'videoquiz = videoquiz:VideoQuizBlock',
        ]
    }
)
