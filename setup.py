#!/usr/bin/env python

from setuptools import setup, find_packages

setup(
    name='browser-engine',
    version='0.0.0',
    description='Brower engines for crawlerflow',
    author='Ravi Raja Merugu',
    author_email='ravi@invanalabs.ai',
    url='https://github.com/crawlerflow/browser-engine',
    packages=find_packages(
        exclude=("dist", "docs", "examples", "tests",)
    ),
    install_requires=[
        'flask',
        'flask-restful',
        'uwsgi',
        'selenium'
    ],
    entry_points={
        'console_scripts': ['browser-engine = browser_engine.server.app']
    },
)