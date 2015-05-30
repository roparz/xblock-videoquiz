import pkg_resources
import requests

from urlparse import urlparse

from xblock.core import XBlock
from xblock.fields import Scope, Integer, String
from xblock.fragment import Fragment

class VideoQuizBlock(XBlock):
    """
    An XBlock providing oEmbed capabilities for video
    """

    src = String(help="URL of the video page at the provider", default=None, scope=Scope.content)

    '''
    Util functions
    '''
    def load_resource(self, resource_path):
        """
        Gets the content of a resource
        """
        resource_content = pkg_resources.resource_string(__name__, resource_path)
        return unicode(resource_content)


    def student_view(self, context):
        """
        Create a fragment used to display the XBlock to a student.
        `context` is a dictionary used to configure the display (unused).

        Returns a `Fragment` object specifying the HTML, CSS, and JavaScript
        to display.
        """
        # Load the HTML fragment from within the package and fill in the template
        html_str = pkg_resources.resource_string(__name__, "static/html/videoquiz.html")
        frag = Fragment(unicode(html_str).format(self=self, src=self.src))
        frag.add_javascript(self.load_resource("static/js/videoquiz.js"))
        frag.initialize_js('coucou')

        return frag


    @staticmethod
    def workbench_scenarios():
        """A canned scenario for display in the workbench."""
        return [
            ("video quiz",
            """
            <vertical_demo>
                <videoquiz src="http://techslides.com/demos/sample-videos/small.mp4" />
            </vertical_demo>
            """)
        ]
